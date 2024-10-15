import React, { useEffect, useState } from "react";
import "./App.css";
import LeaveForm from "./Pages/OutPassForm";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { useSelector } from "react-redux";

import ApprovalPage from "./Pages/ApprovalPage";
import OutPassSec from "./Pages/OutPassSec";
import StudentLogin from "./Components/Login/StudentLogin";
import AdminLogin from "./Components/Login/AdminLogin";
import PrivateRoute from "./Components/PrivateRoute";
import SuccessPage from "./Pages/SuccessPage";
import ProtectedRoute from "./Components/ProtectedRoute";
import TopNavBar from "./Components/VisitorsPass/Login/NavBar/TopNavBar";
import CheckingReduxPage from "./Pages/CheckingReduxPage";
import WardenPrivateRoute from "./Components/WardenPrivateRoute";
//MSAL
// import { loginRequest } from "./authConfig";
import { callMsGraph } from "./graph";
import {
  AuthenticatedTemplate,
  MsalProvider,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { Button } from "antd";
import HostelView from "./Pages/HostelView";
import IdBack from "./Components/IdCardComponent/IdBack";
import DetailsDisplayCard from "./Components/InOutMovement/DetailsDisplayCard";
import ErrorPage from "../src/Pages/ErrorPage";
import LeavesForStudent from "./Pages/LeavesForStudent";
import TableHead from "./Components/TableHead";
import Mess from "./Pages/Mess/Mess"
const firebaseConfig = {
  apiKey: "AIzaSyDEWNIscPxbEi721Qe1d0Eb6wM9iZZA2Yg",
  authDomain: "outpassmu.firebaseapp.com",
  projectId: "outpassmu",
  storageBucket: "outpassmu.appspot.com",
  messagingSenderId: "1082978620385",
  appId: "1:1082978620385:web:63d342defffb6eafb9f8a0",
  measurementId: "G-DX6HPNB9S1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const analytics = getAnalytics(app);

function App({ msalInstance }) {
  const activeKey = useSelector((state) => state.key.activeKey);
  return (
    <MsalProvider instance={msalInstance}>
      <Router>
        <Switch>
          <Route exact path="/login" component={StudentLogin} />

          <Route exact path="/admin-login" component={AdminLogin} />

          <PrivateRoute exact path="/form" component={LeaveForm} />

          <WardenPrivateRoute exact path="/approval" component={ApprovalPage} />
          <Route exact path="/dashboard" component={Mess} />
          <Route exact path="/mess" component={Mess} />


          <WardenPrivateRoute
            exact
            path={"/search/appliedLeaves/:keyword"}
            component={ApprovalPage}
          />

          <WardenPrivateRoute
            exact
            path={"/search/inoutmovement/:InOutKeyword"}
            component={ApprovalPage}
          />

          <WardenPrivateRoute
            exact
            path="/visitor-form"
            component={TopNavBar}
          />

          {/* <WardenPrivateRoute exact path="/head" component={TableHead} /> */}
          <PrivateRoute exact path="/myleaves" component={LeavesForStudent} />

          <WardenPrivateRoute exact path="/hostel" component={HostelView} />

          <Route component={ErrorPage} />
        </Switch>
      </Router>
    </MsalProvider>
  );
}

export default App;
