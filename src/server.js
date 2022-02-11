const express = require("express");
require("./db/conn");
const postRouter = require("./router/router");
const path = require("path");
require("dotenv").config();
const port = process.env.PORT || 3000;

const app = express();

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.static(path.join(__dirname, "../uploads")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api", postRouter);

// running the server
app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
