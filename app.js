const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const usersRoutes = require("./routes/users");
const productsRoutes = require("./routes/products");
const ordersRoutes = require("./routes/orders");

const app = express();


app.use(bodyParser.json());
app.use(cors());

usersRoutes(app);
productsRoutes(app);
ordersRoutes(app);

module.exports = app;