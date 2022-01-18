const express = require("express");
const app = express();

port = 5000;

app.listen(port, () =>
  console.log(`server running at http://localhost:${port}`)
);
