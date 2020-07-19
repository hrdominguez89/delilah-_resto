const jwt = require("jsonwebtoken");
const { configJWT } = require("../config/config");

const getToken = (data) => {
    const token = jwt.sign(data, configJWT.secretWordJWT);
    return token;
}

const authenticateUser = (request) => {
    const token = request.headers.authorization.split(' ')[1];
    const tokenDecoded = jwt.verify(token, configJWT.secretWordJWT);
    if (tokenDecoded) {
        return tokenDecoded;
    } else {
        return false;
    }
}

module.exports = { getToken, authenticateUser };