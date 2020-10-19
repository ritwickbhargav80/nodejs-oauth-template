import React, { useState } from "react";
import axios from "axios";
import { Redirect, Route, Switch } from "react-router-dom";
import Homepage from "./Components/Homepage";
import Dashboard from "./Components/Dashboard";
import NotFound from "./Components/NotFound";
import "./App.css";

const url =
  process.env.REACT_APP_ENV === "development"
    ? process.env.REACT_APP_DEV_SERVER
    : process.env.REACT_APP_PROD_SERVER;

const App = () => {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState({});
  const [error, setError] = useState("");

  const getUser = async () => {
    try {
      const { data: response, status } = await axios({
        url: url + "/auth/google/status",
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
        withCredentials: true,
      });
      if (status !== 200) {
        setError("Failed to authenticate user");
        throw new Error("Failed to authenticate user");
      }
      setUser(response.data);
      setAuth(true);
    } catch (ex) {
      setError("Failed to authenticate user");
      console.log("Logging the error", ex);
    }
  };

  return (
    <Switch>
      <Route
        path="/dashboard"
        component={() => (
          <Dashboard auth={auth} user={user} error={error} getUser={getUser} />
        )}
      />
      <Route path="/not-found" exact component={NotFound} />
      <Route path="/" exact component={Homepage} />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default App;
