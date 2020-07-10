const usersModel = require("../models/usersModel");
const bcrypt = require("bcrypt");
const jwt = require("../authenticate/jwt");

saltRounds = 10;

module.exports = {
    async registerUser(request, response) {
        if (await findExistentUser(request.body, response)) {
            request.body.password = encryptPassword(request.body.password);
            try {
                const userRegistered = await usersModel.registerUser(request.body);
                if (userRegistered[0]) {
                    response.status(201).json({
                        "Message": "La cuenta fue creada con exito"
                    });
                } else {
                    throw new Error("No se pudo registrar el usuario, por favor intente nuevamente");
                }
            } catch (error) {
                response.status(409).json({
                    "Error": error.Message
                });
            }
        }
    },

    async login(request, response) {
        const { username, password } = request.body;
        userData = await usersModel.findUser("username", username);
        console.log(userData);
        if (!userData[0] || !comparePassword(password, userData[0].password)) {
            response.status(404).json({
                "Mensaje": "Usuario y/o password incorrectos"
            });
        } else {
            delete userData[0].password;
            const token = jwt.getToken(userData[0]);
            response.status(200).json({
                "token": token,
            });
        }
    }
}

async function findExistentUser(userData, response) {
    const { username, email } = userData;
    const userFoundByUsername = await usersModel.findUser("username", username);
    if (userFoundByUsername[0]) {
        response.status(409)
            .json({
                "Message": `El Usuario '${username}' ya se encuentra registrado, por favor intente con otro nombre de usuario`
            });
        return false;
    }
    const userFoundByEmail = await usersModel.findUser("email", email);
    if (userFoundByEmail[0]) {
        response.status(409)
            .json({
                "Message": `El Email '${email}' ya se encuentra registrado, por favor intente con otra cuenta de email`
            });
        return false;
    }
    return true
};

const encryptPassword = (password) => {
    const hash = bcrypt.hashSync(password, saltRounds);
    return hash;
}

const comparePassword = (password, passwordDB) => {
    return bcrypt.compareSync(password, passwordDB);
}