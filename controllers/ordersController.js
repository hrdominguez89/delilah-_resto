const ordersModel = require("../models/ordersModel");
const jwt = require("../authenticate/jwt");

module.exports = {
    async registerOrder(request, response) {
        const tokenDecoded = jwt.authenticateUser(request);
        const { idProducts, idPaymentMethod } = request.body;
        try {
            const idOrder = await ordersModel.registerOrder(tokenDecoded.id, idPaymentMethod);
            if (idOrder[0]) {
                let products = [];
                let quantities = [];
                for (let i = 0; i < idProducts.length; i++) {
                    const product = parseInt(idProducts[i]);
                    const found = products.find(element => element === product);
                    if (!found) {
                        products.push(product);
                        quantities.push(1);
                    } else {
                        const indexProduct = products.findIndex((products) => products === found);
                        quantities[indexProduct] += 1;
                    }
                }
                for (let i = 0; i < products.length; i++) {
                    const product = products[i];
                    const quantity = quantities[i];
                    const idOrderProduct = await ordersModel.registerOrderProduct(idOrder[0], product, quantity);
                }
                response.status(201).json({ Message: "Se creo la orden con exito" });
            } else {
                response.status()
            }
        } catch (e) {
            response.status(409).json({ error: e });
        }
    },

    async getOrders(request, response) {
        const tokenDecoded = jwt.authenticateUser(request);
        let orders;
        if (tokenDecoded.isAdmin) {
            orders = await ordersModel.getOrders();
        } else {
            orders = await ordersModel.getOrders(tokenDecoded.id);
        }

        for (let i = 0; i < orders.length; i++) {
            const order = orders[i];
            order.total = order.total.split(";");
            let total = 0;
            for (let j = 0; j < order.total.length; j++) {
                order.total[j] = order.total[j].split(',');
                for (let h = 0; h < order.total[j].length; h++) {
                    total = total + parseInt(order.total[j][h])
                }
            }
            order.total = total;
        }
        response.status(200).json(orders);
    },

    async getOrderById(request, response) {
        const idOrder = parseInt(request.params.id);
        const tokenDecoded = jwt.authenticateUser(request);
        if (tokenDecoded.isAdmin || tokenDecoded.id === idOrder) {
            const order = await ordersModel.getOrderById(idOrder);
            if (order[0]) {
                response.status(200).json(order);
            } else {
                response.status(404).json({ error: `No se encontro ninguna orden con el ID: ${idOrder}` });
            }
        } else {
            response.status(403).json({ error: "Usted no tiene permisos para acceder a esta petición" });
        }
    },

    async updateOrderById(request, response) {
        const idOrder = parseInt(request.params.id);
        const tokenDecoded = jwt.authenticateUser(request);
        if (tokenDecoded.isAdmin) {
            const order = await ordersModel.getOrderById(idOrder);
            if (order[0]) {
                const { idState } = request.body;
                try {
                    await ordersModel.updateOrderById(idOrder, idState);
                    response.status(204).json({ Message: "Orden actualizada con éxito" });
                } catch (e) {
                    response.status(409).json({ error: e });
                }
            } else {
                response.status(404).json({ error: `No se encontro ninguna orden con el ID: ${idOrder}` });
            }
        } else {
            response.status(403).json({ error: "Usted no tiene permisos para modificar esta orden" });
        }
    },

    async deleteOrderById(request, response) {
        const idOrder = parseInt(request.params.id);
        const tokenDecoded = jwt.authenticateUser(request);
        if (tokenDecoded.isAdmin) {
            const order = await ordersModel.getOrderById(idOrder);
            if (order[0]) {
                try {
                    await ordersModel.deleteOrderById(idOrder);
                    response.status(204).json({ Message: "La orden se eliminó con éxito" });
                } catch (e) {
                    response.status(409).json({ error: e });
                }
            } else {
                response.status(404).json({ error: `No se encontro ninguna orden con el ID: ${idOrder}` });
            }
        } else {
            response.status(403).json({ error: "Usted no tiene permisos para modificar esta orden" });
        }
    },
}