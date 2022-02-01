const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const clientRoute = require("./routes/client.route")

const app = express();
dotenv.config();

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
app.use(express.urlencoded({ extended: false }));
app.use("/client", clientRoute)