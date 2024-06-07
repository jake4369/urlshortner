const dotenv = require("dotenv");

dotenv.config();

const app = require("./index");

// SERVER
const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
