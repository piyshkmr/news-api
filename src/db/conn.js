const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/NewsApi", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Database Connection Successfull..");
  })
  .catch((err) => console.log(err));
