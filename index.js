// file untuk membuat server express

const express = require("express");

const server = express();

server.use(() => {
  console.log("server berjalan");
  console.log("server berhenti");
});

server.listen(4000);
