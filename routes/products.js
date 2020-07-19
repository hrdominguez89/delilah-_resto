const productsCtrl = require("../controllers/productsController");

//Middlewares


//Endpoints of Products
module.exports = (app) => {
    app.post("/products", app.isBearerAuth, productsCtrl.registerProduct);
    app.get("/products", productsCtrl.getProducts);
    app.get("/products/:id", app.validateIdParams, productsCtrl.getProductById);
    // app.get("/products/search", productsCtrl.getProductsByQueryString);
    app.put("/products/:id", productsCtrl.updateProductById);
    app.delete("/products/:id", [app.isBearerAuth, app.validateIdParams], productsCtrl.deleteProductById);
}