const { sequelize } = require("../config/config");

module.exports = {
    async registerOrder(idUser, idPaymentMethod) {
        const idOrder = await sequelize.query("INSERT INTO orders (idUser, idPaymentMethod,dateCreated,dateModified) VALUES (:idUser,:idPaymentMethod,current_timestamp(),current_timestamp())", {
            replacements: { idUser: idUser, idPaymentMethod: idPaymentMethod }
        });
        return idOrder;
    },

    async registerOrderProduct(idOrder, idProduct, quantity) {
        const idOrderProduct = await sequelize.query("INSERT INTO orders_products(idOrder, idProduct, quantity) VALUES (:idOrder, :idProduct, :quantity)", {
            replacements: { idOrder: idOrder, idProduct: idProduct, quantity: quantity }
        });
        return idOrderProduct;
    },

    async getOrders(userId = false) {
        const sentenceWhere = `WHERE o.idUser = ${userId}`;
        const orders = await sequelize.query(`SELECT s.state, o.dateCreated, o.id AS number,GROUP_CONCAT(op.quantity*p.price)AS total, GROUP_CONCAT(op.quantity," x ",p.title SEPARATOR ";") AS description, pm.paymentMethod, u.nameAndLastName, u.address
        FROM orders AS o 
        JOIN users AS u ON o.idUser = u.id 
        JOIN states AS s ON o.idState = s.id 
        JOIN payments_methods as pm ON o.idPaymentMethod = pm.id
        JOIN orders_products AS op ON o.id = op.idOrder
        JOIN products AS p on op.idProduct = p.id 
        ${userId? sentenceWhere:""}
        GROUP BY o.id
		ORDER BY o.id`, {
            type: sequelize.QueryTypes.SELECT,
        })
        return orders;
    },

    async getOrderById(idOrder) {
        const order = await sequelize.query(`SELECT GROUP_CONCAT(p.title,", (", p.price,"), ",op.quantity,", ",(op.quantity*p.price) SEPARATOR ";") AS detail, s.id, s.state, pm.paymentMethod, u.nameAndLastName, u.username, u.address,u.email, u.phone FROM orders AS o
        JOIN orders_products AS op ON o.id = op.idOrder
        JOIN users AS u ON o.idUser = u.id
        JOIN products AS p ON op.idProduct = p.id
        JOIN payments_methods AS pm ON o.idPaymentMethod = pm.id
        JOIN states AS s ON o.idState = s.id
        WHERE o.id = :idOrder
        GROUP BY o.id`, {
            replacements: { idOrder: idOrder },
            type: sequelize.QueryTypes.SELECT,
        });
        return order;
    },

    async updateOrderById(idOrder, idState) {
        const orderUpdated = await sequelize.query("UPDATE orders SET idState = :idState, dateModified = current_timestamp() WHERE orders.id = :idOrder", {
            replacements: { idState: idState, idOrder: idOrder }
        });
        return orderUpdated;
    },

    async deleteOrderById(idOrder) {
        const orderProductDeleted = await sequelize.query("DELETE FROM orders_products WHERE idOrder = :idOrder", {
            replacements: { idOrder: idOrder }
        });
        const orderDeleted = await sequelize.query("DELETE FROM orders WHERE id = :idOrder", {
            replacements: { idOrder: idOrder }
        })
        return orderDeleted;
    }

}