const ordersCtrl = require("../controllers/ordersController");

module.exports = (app) => {
    app.post("/orders", app.isBearerAuth, ordersCtrl.registerOrder);
    app.get("/orders", app.isBearerAuth, ordersCtrl.getOrders);
    app.get("/orders/:id", [app.isBearerAuth, app.validateIdParams], ordersCtrl.getOrderById);
    app.patch("/orders/:id", [app.isBearerAuth, app.validateIdParams], ordersCtrl.updateOrderById);
    app.delete("/orders/:id", [app.isBearerAuth, app.validateIdParams], ordersCtrl.deleteOrderById);
}