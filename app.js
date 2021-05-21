require("dotenv").config();
const express = require("express");
const router = require("./src/routers/index");
const app = express();
require("./src/db/db");

app.use(express.json());
app.use(router);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Connected To Port ${port}...`);
});
