const ordersCtrl = require("../controllers/ordersController");

module.exports = (app) => {
    app.get("/orders", (request, response) => {
        console.log("esta ruta es de orders get");
    });
    app.post("/orders", (request, response) => {
        console.log("esto ruta es de orders post");
    })
}