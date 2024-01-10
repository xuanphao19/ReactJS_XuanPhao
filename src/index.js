import React from "react";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {sendToVercelAnalytics} from "./vitals";
import {createRoot} from "react-dom/client";

// import ReactDOM from "react-dom";
//React@17:
// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

reportWebVitals(sendToVercelAnalytics);
