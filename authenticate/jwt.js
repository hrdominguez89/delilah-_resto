const jwt = require("jsonwebtoken");
const { configJWT } = require("../config/config");

const getToken = (data) => {
    const token = jwt.sign(data, configJWT.secretWordJWT);
    return token;
}

const authenticateUser = (request, response, next) => {
    try {
        const token = request.headers.authorization.split(' ')[1];
        const tokenDecoded = jwt.verify(token, configJWT.secretWordJWT);
        if (tokenDecoded) {
            next();
        } else {
            throw new Error({
                Error: "Usuario no autenticado",
            })
        }
    } catch (error) {
        response.status(401).json({
            "error": error,
        })
    }
}

module.exports = { getToken, authenticateUser };