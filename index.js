const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const compression = require("compression");
const morgan = require("morgan");
const consola = require("consola");
const helmet = require("helmet");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

const { NODE_ENV, PORT, SESSION_SECRET } = require("./config/index");
const { notFound, sendErrors } = require("./config/errorHandler");

const app = express();
const cors = require("cors");
require("dotenv").config();
require("./config/dbconnection");

// Passport config
require("./config/passport")(passport);

consola.wrapConsole();

app.use(compression());
app.use(morgan("dev"));
app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 1000000,
  })
);
app.use(
  bodyParser.json({
    limit: "50mb",
    extended: true,
    parameterLimit: 1000000,
  })
);

if (NODE_ENV === "production") {
  console.log = console.warn = console.error = () => {};
}

// Sessions
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//load Schemas
const User = require("./models/User");

//Routes
app.use("/api/v1", require("./routes/api/v1/index"));
app.use("/api/v1/auth", require("./routes/api/v1/auth"));

// 404 route
app.use("*", notFound);

//Error Handlers
app.use(sendErrors);

// Allowing headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
  next();
});

//starting up server
(async () => {
  try {
    await app.listen(PORT);
    console.info(
      `NODE_ENV: ${NODE_ENV}\nServer is up and running on Port ${PORT}`
    );
  } catch (err) {
    console.info("Error in running server.");
  }
})();
