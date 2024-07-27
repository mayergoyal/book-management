const mongoose = require("mongoose");

function dbConnection() {
  const DB_URL =
    "mongodb+srv://22103300:krishna@cluster0.rnokkvu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
  mongoose
    .connect(DB_URL)
    .then(() => {
      console.log("MongoDB database connected");
    })
    .catch((error) => {
      if (error.code === "ENOTFOUND") {
        console.error(
          "Failed to connect to MongoDB server. Check server address."
        );
      } else if (error.code === "MongoNetworkError") {
        console.error(
          "Network error connecting to MongoDB. Check network connectivity."
        );
      } else if (error.code === "MongoAuthError") {
        console.error(
          "Authentication error connecting to MongoDB. Check username and password."
        );
      } else {
        console.error("Error connecting to MongoDB:", error);
      }
    });
}

module.exports = dbConnection;
