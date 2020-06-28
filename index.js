const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");

const server = express();

server.use(bodyParser.json());
server.use(cors());


server.get('/test', (response, request) => {
    response.send("TODO OK");
})

server.listen("80", () => {
    console.log("TODO OK");
})