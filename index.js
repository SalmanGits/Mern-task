const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const routes = require("./routes/route");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(bodyParser.json());
require("dotenv").config();

app.use(routes);

mongoose.connect(
  process.env.MONGO_URI,
  {
    useUnifiedTopology: true,

    useNewUrlParser: true,
  },
  (err) => {
    if (err) {
      console.log(err.message);
      return;
    } else {
      console.log("mongo connected");
    }
  }
);

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log("listening on port", PORT);
});
