import React from "react";
import { render } from "react-dom";
import './index.css';
import App from './App';
import { Provider } from "react-redux";
import store from "./store/index";

import registerServiceWorker from './registerServiceWorker';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
// import '../node_modules/bootstrap/dist/css/bootstrap-theme.min.css' // optional
// import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
// import index from "./js/index"

// Commented out in the course of adding Redux
// ReactDOM.render(<App />, document.getElementById('root'));



// import App from "../App";

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();
