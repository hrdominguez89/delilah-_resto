const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const usersRoutes = require("./routes/users");
const productsRoutes = require("./routes/products");
const ordersRoutes = require("./routes/orders");

const app = express();

//Globals Middlewares 
app.use(bodyParser.json());
app.use(cors());

//Middlewares
app.isBearerAuth = (request, response, next) => {
    if (request.headers.authorization && request.headers.authorization.split(" ")[0] === "Bearer") {
        next();
    } else {
        response.status(401)
            .json({
                "Error": "Usuario no autenticado",
            })
    }
}

app.validateIdParams = (request, response, next) => {
    const id = parseInt(request.params.id);
    if (isNaN(id)) {
        response.status(400)
            .json({
                "Error": "El parametro ingresado es invalido",
            })
    } else {
        next();
    }
}


//Routes
usersRoutes(app);
productsRoutes(app);
ordersRoutes(app);

module.exports = app;