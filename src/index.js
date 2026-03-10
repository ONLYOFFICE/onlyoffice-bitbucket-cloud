import Resolver from '@forge/resolver';
import { invokeRemote } from '@forge/api';

const resolver = new Resolver();

resolver.define('getEditorUrl', async ({ payload }) => {
  console.log(payload);
  const workspaceId = payload.workspaceId;
  const repositoryId = payload.repositoryId;
  const commit = payload.commit;
  const filePath = payload.filePath;
  const locale = payload.locale;

  try {
    const response = await invokeRemote('onlyoffice-remote', {
      path: '/api/v1/remote/authorization',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        workspaceId: workspaceId,
        parentId: repositoryId,
        entityId: filePath,
        commit: commit,
        locale: locale,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('Remote authorization error:', response.status, errorBody);
      return { error: `Authorization failed: ${response.status}` };
    }

    const { remoteAppUrl, token } = await response.json();
    const editorUrl = `${remoteAppUrl}/editor/bitbucket?mode=VIEW&token=${encodeURIComponent(token)}`;

    return { editorUrl };
  } catch (error) {
    console.error('Failed to get editor URL:', error);
    return { error: 'Failed to initialize editor' };
  }
});

export const handler = resolver.getDefinitions();
