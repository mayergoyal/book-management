const express = require("express");
const { users } = require("./data/users.json");
const { books } = require("./data/books.json");
const app = express();
const PORT = 8081;
const userRouter = require("./roots/users");
const bookRouter = require("./roots/books");
const dotenv = require("dotenv");
dotenv.config();
const dbConnection = require("./databaseConnection");
dbConnection();
app.use(express.json()); //using in json  format
app.get("/", (req, res) => {
  res.status(200).json({ message: "server is running " });
});

app.use("/users", userRouter);
app.use("/books", bookRouter);

//we can use send also for sending response but it cannot hold multiple data means .send("fine") will work but .send("fine","hello") will not work !!
app.listen(PORT, () => {
  console.log("server is running at port ");
});
