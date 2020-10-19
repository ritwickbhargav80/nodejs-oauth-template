import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";

const url =
  process.env.REACT_APP_ENV === "development"
    ? process.env.REACT_APP_DEV_SERVER
    : process.env.REACT_APP_PROD_SERVER;

const Dashboard = ({ auth, user, error, getUser }) => {
  useEffect(() => {
    if (!auth) getUser();
  }, [auth, getUser]);

  return error === "" ? (
    <div>
      <header className=" App-header-1">
        <h2>Dashboard</h2>
        <a
          className="App-link"
          href={url + "/auth/logout"}
          rel="noopener noreferrer"
        >
          <button className="btn">
            <b>Logout</b>
          </button>
        </a>
        {user.displayName ? <p>Welcome, {user.displayName}</p> : ""}
      </header>
    </div>
  ) : (
    <Redirect to="/" />
  );
};

export default Dashboard;
