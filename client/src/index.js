import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/app';

if(module.hot){  
  module.hot.accept('./app/app',()=>{
    const NextApp = require('./app/app').default
    ReactDOM.render(
      <React.StrictMode>
        <NextApp />
      </React.StrictMode>,
      document.getElementById('root')
    );
  });
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
