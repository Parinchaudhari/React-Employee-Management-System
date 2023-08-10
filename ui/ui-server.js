const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();
const port = process.env.ui_port || 3000;

app.use(express.static("public"));

console.log(process.env.ui_port);

console.log("i am ui server");

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(port, () => {
  console.log(`UI server started at ${port}`);
});
