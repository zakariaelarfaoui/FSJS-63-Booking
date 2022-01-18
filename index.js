const express = require("express");
const app = express();

port = 5000;

const authRoutes = require("./routes/auth")
app.use("/", authRoutes);



app.listen(port, () =>
  console.log(`server running on http://localhost:${port}`)
);
