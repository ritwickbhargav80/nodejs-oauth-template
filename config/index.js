require("dotenv").config();

module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  DEV_CLIENT: process.env.DEV_CLIENT,
  PROD_CLIENT: process.env.PROD_CLIENT,
  SESSION_SECRET: process.env.SESSION_SECRET,
  MONGO_URI:
    process.env.NODE_ENV === "production"
      ? process.env.MONGO_URI_PROD
      : process.env.MONGO_URI_DEV,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
};
