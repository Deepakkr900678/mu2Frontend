import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";

// New Redux
import store from "./store/store";
import { Provider } from "react-redux";

//MSAL
import { EventType, PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./authConfig";

const msalInstance = new PublicClientApplication(msalConfig);

msalInstance.addEventCallback((event) => {
  if (event.eventType === EventType.LOGIN_SUCCESS) {
    msalInstance.setActiveAccount(event.payload.account);
  }
});

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App msalInstance={msalInstance} />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
