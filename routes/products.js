const productsCtrl = require("../controllers/productsController");

module.exports = (app) => {
    app.get("/products", (request, response) => {
        console.log("esta ruta es de products get");
    });
    app.post("/products", (request, response) => {
        console.log("esto ruta es de products post");
    })
}