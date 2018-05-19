import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
// import '../node_modules/bootstrap/dist/css/bootstrap-theme.min.css' // optional
// import '../node_modules/bootstrap/dist/js/bootstrap.min.js'

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
