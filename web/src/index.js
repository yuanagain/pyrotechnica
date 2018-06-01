import React, {ReactDOM} from "react";
import { render } from "react-dom";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import index from "./js/index"

import registerServiceWorker from './registerServiceWorker';

// import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
// import '../node_modules/bootstrap/dist/css/bootstrap-theme.min.css' // optional
// import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
// import index from "./js/index"

// Commented out in the course of adding Redux
// import App from "./App";
// ReactDOM.render(<App />, document.getElementById('root'));


registerServiceWorker();
