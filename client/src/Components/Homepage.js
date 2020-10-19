import React, { useEffect, useState } from "react";
import axios from "axios";
import logo from "../logo.svg";

const url =
  process.env.REACT_APP_ENV === "development"
    ? process.env.REACT_APP_DEV_SERVER
    : process.env.REACT_APP_PROD_SERVER;

const Homepage = () => {
  const [text, setText] = useState("Loading...");

  const getText = async () => {
    try {
      const { data: response, status } = await axios.get(url);
      if (status !== 200) {
        setText("An unexpected error occurred");
        throw new Error("Invalid URL");
      }
      setText(response.data);
    } catch (ex) {
      setText("An unexpected error occurred");
      console.log("Logging the error", ex);
    }
  };

  useEffect(() => {
    getText();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{text}</p>
        <a
          className="App-link"
          href={url + "/auth/google"}
          rel="noopener noreferrer"
        >
          <button className="btn">
            <img
              className="google-logo"
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              alt="Google Logo"
            />
            <b>Log in to Google</b>
          </button>
        </a>
      </header>
    </div>
  );
};

export default Homepage;
