const { sequelize } = require("../config/config");

module.exports = {
    async registerProduct(dataProduct) {
        const { title, price, image } = dataProduct;
        const productRegistered = await sequelize.query("INSERT INTO products (title, price, image, dateCreated, dateModified) VALUES (:title,:price,:image,current_timestamp(),current_timestamp())", {
            replacements: { title: title, price: price, image: image }
        });
        return productRegistered;
    },

    async getProducts() {
        const products = await sequelize.query("SELECT * FROM products", {
            type: sequelize.QueryTypes.SELECT
        });
        return products;
    },

    async getProductById(id) {
        const product = await sequelize.query("SELECT * FROM products WHERE id = :id", {
            replacements: { id: id },
            type: sequelize.QueryTypes.SELECT
        });
        return product;
    },

    async deleteProductById(id) {
        const productDeleted = await sequelize.query("DELETE FROM products WHERE id=:id", {
            replacements: { id: id }
        });
        return productDeleted;
    },

    async updateProductById(idProduct, dataProduct) {
        const { title, price, image } = dataProduct
        const productUpdated = await sequelize.query("UPDATE products SET title = :title, price = :price, image = :image, dateModified = current_timestamp() WHERE id = :idProduct", {
            replacements: { title: title, price: price, image: image, idProduct: idProduct }
        })
        return productUpdated;
    }
}