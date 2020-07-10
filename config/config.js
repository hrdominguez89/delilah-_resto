const { Sequelize } = require("sequelize");
//Configuracion de base de datos
const configDataBase = {
    userDB: "root",
    passwordDB: "",
    hostDB: "localhost",
    portDB: "3306",
    dataBase: "delilah"
}

const sequelize = new Sequelize(`mysql://${configDataBase.userDB}:${configDataBase.passwordDB}@${configDataBase.hostDB}:${configDataBase.portDB}/${configDataBase.dataBase}`);

//Configuracion JWT

const configJWT = {
    secretWordJWT: "JaVa$cRiPt",
}

//Configuracion Server

const configServer = {
    port: process.env.PORT || 3000
}

module.exports = { sequelize, configJWT, configServer };