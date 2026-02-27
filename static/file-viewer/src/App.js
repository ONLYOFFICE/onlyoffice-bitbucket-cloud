import React, { useEffect, useState, useRef } from 'react';
import { invoke } from '@forge/bridge';

function App() {
  const [error, setError] = useState(null);
  const editorRef = useRef(null);

  useEffect(() => {
    invoke('getContent').then((data) => {
      console.log("getContent data:", data);

      if (data.error) {
        setError(data.error);
        return;
      }

      const config = {
        ...data.config,
        // Use a fixed pixel height because the Forge iframe auto-resizes
        // based on content. Percentage values collapse to 0.
        height: '800px',
        width: '100%',
      };

      // Initialize the ONLYOFFICE editor in the placeholder div.
      // The config (including JWT token) is fully prepared by the backend.
      editorRef.current = new window.DocsAPI.DocEditor('onlyoffice-editor', config);
    }).catch((err) => {
      console.error('Failed to load editor config:', err);
      setError('Failed to load file');
    });

    // Cleanup: destroy the editor instance when the component unmounts
    return () => {
      if (editorRef.current) {
        editorRef.current.destroyEditor();
        editorRef.current = null;
      }
    };
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <div id="onlyoffice-editor"></div>
    </div>
  );
}

export default App;
