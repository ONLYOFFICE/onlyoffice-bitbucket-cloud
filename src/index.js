import Resolver from '@forge/resolver';
import api, { route, webTrigger } from '@forge/api';
import jwt from 'jsonwebtoken';

const resolver = new Resolver();

// JWT secret used by the ONLYOFFICE Document Server to verify requests.
// Must match the secret configured in the Document Server's local.json
// (services.CoAuthoring.secret.browser.string).
const JWT_SECRET = 'MYSECRET';

// Map file extensions to ONLYOFFICE documentType values
const DOCUMENT_TYPES = {
  word: ['doc', 'docx', 'docm', 'dot', 'dotx', 'dotm', 'odt', 'fodt', 'ott', 'rtf', 'txt', 'html', 'htm', 'mht', 'xml', 'epub', 'fb2'],
  cell: ['xls', 'xlsx', 'xlsm', 'xlt', 'xltx', 'xltm', 'ods', 'fods', 'ots', 'csv'],
  slide: ['ppt', 'pptx', 'pptm', 'pot', 'potx', 'potm', 'odp', 'fodp', 'otp'],
  pdf: ['pdf', 'djvu', 'xps', 'oxps'],
};

// Returns the ONLYOFFICE documentType for a given file extension
function getDocumentType(extension) {
  for (const [type, extensions] of Object.entries(DOCUMENT_TYPES)) {
    if (extensions.includes(extension)) {
      return type;
    }
  }
  return null;
}

// Builds the full ONLYOFFICE editor config and signs it with JWT.
// The document.url points to our webtrigger proxy so the Document Server
// can fetch the file without needing Bitbucket credentials.
resolver.define('getContent', async ({ context }) => {
  const workspaceId = context.workspaceId;
  const repositoryId = context.extension.repository.uuid;
  const filePath = context.extension.file.path;
  const commit = context.extension.commit.hash;

  // Extract just the filename from the full path (e.g. "docs/report.docx" -> "report.docx")
  const fileName = filePath.split('/').pop();
  const extension = fileName.split('.').pop().toLowerCase();
  const documentType = getDocumentType(extension);

  if (!documentType) {
    return { error: `Unsupported file type: .${extension}` };
  }

  // Get the webtrigger URL for the file-proxy endpoint.
  // This is a publicly accessible URL that the Document Server can call.
  const proxyBaseUrl = await webTrigger.getUrl('file-proxy');

  // Sign the file coordinates into a JWT so the proxy can verify the request
  // and know which file to fetch. This prevents unauthorized access.
  const fileToken = jwt.sign(
    { workspaceId, repositoryId, filePath, commit },
    JWT_SECRET,
    { expiresIn: '1h' }
  );

  // The download URL is our proxy with the signed token as a query parameter
  const downloadUrl = `${proxyBaseUrl}?token=${encodeURIComponent(fileToken)}`;

  // Build a unique document key from commit hash and file path.
  // ONLYOFFICE uses this to identify the document for caching/co-editing.
  const key = `${commit}_${filePath}`.replace(/[^0-9a-zA-Z._=-]/g, '_').substring(0, 128);

  const config = {
    documentType,
    document: {
      fileType: extension,
      key,
      title: fileName,
      url: downloadUrl,
    },
    editorConfig: {
      // View-only mode since the app only has read:repository scope
      mode: 'view',
    },
  };

  // Sign the entire editor config with HS256 and attach as the token field.
  // The Document Server will verify this token using the shared secret.
  config.token = jwt.sign(config, JWT_SECRET);

  console.log(config);

  return { config };
});

export const handler = resolver.getDefinitions();

// Webtrigger handler that acts as a proxy between the ONLYOFFICE Document Server
// and Bitbucket. The Document Server calls this URL to download the file.
// Since webtriggers are public endpoints, we verify the JWT token in the query
// to ensure only authorized requests get through.
export const fileProxyHandler = async (request) => {
  try {
    // Extract and verify the signed token from the query string
    const tokenParam = request.queryParameters?.token?.[0];
    if (!tokenParam) {
      return { statusCode: 401, body: 'Missing token' };
    }

    const { workspaceId, repositoryId, filePath, commit } = jwt.verify(tokenParam, JWT_SECRET);

    // Fetch the file from Bitbucket using app-level credentials.
    // asApp() is used because webtriggers don't have a user context.
    const response = await api
      .asApp()
      .requestBitbucket(
        route`/2.0/repositories/${workspaceId}/${repositoryId}/src/${commit}/${filePath}`,
        { redirect: 'manual' }
      );

    // Log full response details for debugging
    const responseHeaders = {};
    response.headers.forEach((value, key) => { responseHeaders[key] = value; });
    console.log('Bitbucket response:', {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });

    // If Bitbucket returns a redirect, pass the Location URL through.
    // The Document Server will follow it and download the file directly.
    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get('location');
      if (location) {
        return {
          statusCode: 302,
          headers: { 'Location': [location] },
          body: '',
        };
      }
    }

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('Bitbucket API error:', response.status, errorBody);
      return { statusCode: response.status, body: errorBody };
    }

    // Read as ArrayBuffer to preserve binary data, then encode as Latin-1.
    // Latin-1 maps each byte (0-255) to exactly one character, avoiding
    // the data loss that occurs with response.text() (UTF-8 decoding).
    const arrayBuffer = await response.arrayBuffer();
    const body = Buffer.from(arrayBuffer).toString('latin1');
    console.log('Response: content-length:', response.headers.get('content-length'),
      'arrayBuffer size:', arrayBuffer.byteLength, 'body.length:', body.length);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': [response.headers.get('content-type') || 'application/octet-stream'],
        'Content-Disposition': [`attachment; filename="${filePath.split('/').pop()}"`],
      },
      body,
    };
  } catch (error) {
    console.error('File proxy error:', error);
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return { statusCode: 401, body: 'Invalid or expired token' };
    }
    return { statusCode: 500, body: 'Internal server error' };
  }
};
