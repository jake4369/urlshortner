const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const app = require("./index");

// DB
const DB = process.env.MONGODB_URI;

mongoose
  .connect(DB)
  .then(() => console.log("DB succesfully connected"))
  .catch((err) => console.error(err));

// SERVER
const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
