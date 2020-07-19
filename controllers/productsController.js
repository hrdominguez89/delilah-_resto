const productsModel = require("../models/productsModel");
const jwt = require("../authenticate/jwt");

module.exports = {
    async registerProduct(request, response) {
        try {
            tokenDecoded = jwt.authenticateUser(request);
            if (tokenDecoded.isAdmin === 1) {
                if (verifyProductData(request.body, response)) {
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
                    response.status(204).json({
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
            response.status(409).json({
                "error": Error
            })
        }
    },

    async updateProductById(request, response) {
        tokenDecoded = jwt.authenticateUser(request);
        if (tokenDecoded.isAdmin === 1) {
            const idProduct = request.params.id;
            const product = await productsModel.getProductById(idProduct);
            if (product) {
                if (verifyProductData()) {
                    try {
                        const productUpdated = await productsModel.updateProductById(idProduct, request.body);
                        response.status(204).json({ Message: "Producto editado con éxito" });
                    } catch (e) {
                        response.status(409).json({ error: "No se pudo editar, por favor intente nuevamente" });
                    }
                }
            } else {
                response.status(404).json({ error: `Producto no encontrado con el ID:${idProduct}` });
            }
        } else {
            response.status(403).json({ error: "Usuario sin permisos" })
        }

    }

}

function verifyProductData(productData, response) {
    const { title, price, image } = productData;
    let dataProductValidate = []
    if (typeof(title) !== "string" || title === "") {
        dataProductValidate.push("Title: no paso la verificación de datos, debe ser de tipo STRING y/o no debe ser un campo vacío");
    }
    if (isNaN(parseInt(price))) {
        dataProductValidate.push("Price: no paso la verificación de datos, debe ser de tipo INTEGER y/o no debe ser un campo vacío");
    }
    if (typeof(image) !== "string" || image === "") {
        dataProductValidate.push("Image: no paso la verificación de datos, debe ser de tipo STRING y/o no debe ser un campo vacío");
    }
    if (dataProductValidate.length) {
        response.status(405).json({ Message: dataProductValidate });
        return false;
    }
    return true;
}