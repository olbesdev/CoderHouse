const fs = require("fs");
const express = require("express");

/* -------------------------------------------------------------------------- */
/*                                   EXPRESS                                  */
/* -------------------------------------------------------------------------- */

const app = express();

/* -------------------------------------------------------------------------- */
/*                                   ROUTES                                   */
/* -------------------------------------------------------------------------- */

app.get("/", (req, res) => {
  res.send("<h1>A ver si funciona esta joda</h1>");
  //res.send({hello: "world"}) JSON Format
});

/* -------------------------------------------------------------------------- */
/*                             SERVER_DECLARATION                             */
/* -------------------------------------------------------------------------- */

const PORT = process.env.PORT || 4005
const server = app.listen(PORT, () => {
  console.log(`Server Running on http://localhost:${server.address().port}`);
});
