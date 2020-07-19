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
                        "mensaje": "La cuenta fue creada con exito"
                    });
                } else {
                    throw new Error("No se pudo registrar el usuario, por favor intente nuevamente");
                }
            } catch (error) {
                response.status(409).json({
                    "Error": error.mensaje
                });
            }
        }
    },

    async login(request, response) {
        const { username, password } = request.body;
        userData = await usersModel.findUser("username", username);
        if (!userData[0] || !comparePassword(password, userData[0].password)) {
            response.status(404).json({
                "Mensaje": "Usuario y/o password incorrectos"
            });
        } else {
            delete userData[0].password;
            const token = jwt.getToken(userData[0]);
            response.status(200).json({
                "token": token,
                "userId": userData[0].id
            });
        }
    },

    async getUsers(request, response) {
        try {
            tokenDecoded = jwt.authenticateUser(request);
            if (tokenDecoded.isAdmin === 1) {
                const users = await usersModel.getUsers();
                response.status(200).json(users);
            } else {
                response.status(403).json({
                    "error": "Usuario sin permisos",
                });
            }
        } catch (Error) {
            response.status(401).json({
                "error": Error
            })
        }
    },

    async getUserById(request, response) {
        try {
            tokenDecoded = jwt.authenticateUser(request);
            const idUser = parseInt(request.params.id);
            if (tokenDecoded.isAdmin === 1 || tokenDecoded.id === idUser) {
                const user = await usersModel.getUserById(idUser);
                if (user[0]) {
                    response.status(200).json(user);
                } else {
                    response.status(404).json({
                        "error": "No se encontro ningun usuario con el id " + idUser
                    })
                }
            } else {
                response.status(403).json({
                    "error": "Su cuenta no tiene los permisos necesarios para ver los datos de este usuario",
                });
            }
        } catch (Error) {
            response.status(401).json({
                "error": Error
            })
        }
    },

    async updateUserById(request, response) {
        try {
            tokenDecoded = jwt.authenticateUser(request);
            const idUser = parseInt(request.params.id);
            if (tokenDecoded.isAdmin === 1 || tokenDecoded.id === idUser) {
                const user = await usersModel.getUserById(idUser);
                if (user[0]) {
                    response.status(200).json(user);
                } else {
                    response.status(404).json({
                        "error": "No se encontro ningun usuario con el id " + idUser
                    })
                }
            } else {
                response.status(403).json({
                    "error": "Su cuenta no tiene los permisos necesarios para modificar los datos de este usuario",
                });
            }
        } catch (Error) {
            response.status(401).json({
                "error": Error
            })
        }
    },
    async deleteUserById(request, response) {
        try {
            tokenDecoded = jwt.authenticateUser(request);
            const idUser = parseInt(request.params.id);
            if (tokenDecoded.isAdmin === 1) {
                const user = await usersModel.getUserById(idUser);
                if (user[0]) {
                    await usersModel.deleteUserById(idUser);
                    response.status(200).json({
                        "mensaje": "El usuario se eliminó correctamente"
                    });
                } else {
                    response.status(404).json({
                        "error": "No se encontro ningun usuario con el id " + idUser
                    })
                }
            } else {
                response.status(403).json({
                    "error": "Su cuenta no cuenta con los permisos necesarios para eliminar este usuario",
                });
            }
        } catch (Error) {
            response.status(401).json({
                "error": Error
            })
        }
    }


}

async function findExistentUser(userData, response) {
    const { username, email } = userData;
    const userFoundByUsername = await usersModel.findUser("username", username);
    if (userFoundByUsername[0]) {
        response.status(409)
            .json({
                "mensaje": `El Usuario '${username}' ya se encuentra registrado, por favor intente con otro nombre de usuario`
            });
        return false;
    }
    const userFoundByEmail = await usersModel.findUser("email", email);
    if (userFoundByEmail[0]) {
        response.status(409)
            .json({
                "mensaje": `El Email '${email}' ya se encuentra registrado, por favor intente con otra cuenta de email`
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