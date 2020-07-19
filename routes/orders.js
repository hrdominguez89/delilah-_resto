const ordersCtrl = require("../controllers/ordersController");

module.exports = (app) => {
    app.post("/orders", app.isBearerAuth, ordersCtrl.registerOrder);
    app.get("/orders", ordersCtrl.getOrders);
    app.get("/orders/:id", ordersCtrl.getOrderById);
    app.patch("/orders/:id", ordersCtrl.updateOrderById);
    app.delete("/orders/:id", ordersCtrl.deleteOrderById);
}