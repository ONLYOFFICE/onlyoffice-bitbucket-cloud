import React, { useEffect, useState } from 'react';
import { invoke } from '@forge/bridge';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    invoke('getContent').then((result) => {
      setData(result.content);
    });
  }, []);

  return (
    <div>
      {data ? data : 'Loading...'}
    </div>
  );
}

export default App;
