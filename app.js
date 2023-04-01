const express = require("express");
const router = require("./src/routes/users.routes");
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : false}));

app.use('/auth', router);

module.exports = app;