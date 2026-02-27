import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import '@atlaskit/css-reset';

// Forge Custom UI iframe uses auto-resize based on content height.
// Percentage heights don't work because there is no fixed parent height.
// We must set an explicit pixel height so the iframe resizer picks it up.
const style = document.createElement('style');
style.textContent = 'html, body, #root { margin: 0; padding: 0; }';
document.head.appendChild(style);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
