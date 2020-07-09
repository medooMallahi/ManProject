import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./Resources/css/app.css";
import App from "./App";
import { firebase } from "./firbase";
firebase.auth().onAuthStateChanged(user => {
  console.log(user);
  ReactDOM.render(
    <BrowserRouter>
      <App user={user} />
    </BrowserRouter>,
    document.getElementById("root")
  );
});
