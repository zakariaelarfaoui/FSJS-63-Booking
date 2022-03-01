const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");

const routes = require("./routes/index.routes");

const app = express();
app.use(cors());
var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connection Success.");
    app.listen(PORT, () =>
      console.log(`server running at http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use("/", routes);
