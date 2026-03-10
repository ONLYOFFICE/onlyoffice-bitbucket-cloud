import React, { useEffect, useState } from 'react';
import { invoke, view } from '@forge/bridge';
import { Flex, xcss } from "@atlaskit/primitives";
import Spinner from "@atlaskit/spinner";

const styles = {
  mainContainer: xcss({
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    margin: "0",
    padding: "0",
    justifyContent: "center",
    alignItems: "center",
  }),
  iframe: {
    width: "100%",
    height: "100%",
    border: "unset",
  },
};

function App() {
  const [editorUrl, setEditorUrl] = useState(null);
  const [error, setError] = useState(null);
  const [context, setContext] = useState();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const context = await view.getContext();
      setContext(context);
    })();
  }, []);


  useEffect(() => {
    // if (remoteAppUrl.current) {
      const handleMessage = (event) => {
        const { type, data } = event.data;


        if (type === "PAGE_IS_LOADED") {
          setLoading(false);
        }
      };

      window.addEventListener("message", handleMessage);

      return () => {
        window.removeEventListener("message", handleMessage);
      };
    // }
  }, );

  useEffect(() => {
    if (!context) return;

    invoke('getEditorUrl', {
      workspaceId: context.workspaceId,
      repositoryId: context.extension.repository.uuid,
      commit: context.extension.commit.hash,
      filePath: context.extension.file.path,
      locale: context.locale,
    }).then((data) => {
      if (data.error) {
        setError(data.error);
        return;
      }
      setEditorUrl(data.editorUrl);
    }).catch((err) => {
      console.error('Failed to get editor URL:', err);
      setError('Failed to load file');
    });
  }, [context]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Flex xcss={styles.mainContainer}>
      {loading && <Spinner size="xlarge" label="Loading..." />}
      {editorUrl && (
        <iframe
          // ref={iframeRef}
          style={{
            ...styles.iframe,
            display: loading ? "none" : "block",
          }}
          src={editorUrl}
        />
      )}
    </Flex>
  );

  
}

export default App;
