const productsModel = require("../models/productsModel");
const jwt = require("../authenticate/jwt");

module.exports = {
    async registerProduct(request, response) {
        try {
            tokenDecoded = jwt.authenticateUser(request);
            if (tokenDecoded.isAdmin === 1) {
                const product = await productsModel.registerProduct(request.body);
                if (product[0]) {
                    response.status(201).json({
                        "mensaje": "Producto registrado con exito"
                    });
                } else {
                    response.status(409).json({
                        "error": "No se pudo registrar el producto, por favor intente nuevamente"
                    })
                }
            } else {
                response.status(403).json({
                    "error": "Su cuenta no tiene los permisos necesarios para registrar productos",
                });
            }
        } catch (Error) {
            response.status(401).json({
                "error": Error
            })
        }
    },

    async getProducts(request, response) {
        const products = await productsModel.getProducts();
        response.status(200).json(products);
    },

    async getProductById(request, response) {
        const idProduct = parseInt(request.params.id);
        const product = await productsModel.getProductById(idProduct);
        if (product[0]) {
            response.status(200).json(product);
        } else {
            response.status(404).json({
                "error": "No se encontro ningun producto con el ID " + idProduct
            })
        }
    },

    async deleteProductById(request, response) {
        try {
            tokenDecoded = jwt.authenticateUser(request);
            if (tokenDecoded.isAdmin === 1) {
                const idProduct = parseInt(request.params.id);
                const product = await productsModel.getProductById(idProduct);
                if (product[0]) {
                    await productsModel.deleteProductById(idProduct);
                    response.status(200).json({
                        "mensaje": "Producto eliminado con exito"
                    });
                } else {
                    response.status(404).json({
                        "error": "No se encontró el producto con id: " + idProduct
                    })
                }
            } else {
                response.status(403).json({
                    "error": "Su cuenta no tiene los permisos necesarios para eliminar productos",
                });
            }
        } catch (Error) {
            response.status(401).json({
                "error": Error
            })
        }
    },

    async updateProductById(request, response) {
        const idProduct = request.params.id;
        const product = await productsModel.getProductById(idProduct);
        if (product) {
            const productUpdated = productsModel.updateProductById(idProduct, request.body);
        }
    }

}