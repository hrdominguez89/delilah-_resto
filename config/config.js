// MODIFICAR ESTOS DATOS SOLO SI ES NECESARIO

const { Sequelize } = require("sequelize");
//Configuracion de base de datos
const configDataBase = {
    userDB: "root", //  USUARIO DE NUESTRA BD
    passwordDB: "", //  PASSWORD DE NUESTRA BD
    hostDB: "localhost", //  DIRECCION DE NUESTRA BD
    portDB: "3306", //  PUERTO DE NUESTRA BD
    dataBase: "delilah" //  NOMBRE DE NUESTRA BD
}

const sequelize = new Sequelize(`mysql://${configDataBase.userDB}:${configDataBase.passwordDB}@${configDataBase.hostDB}:${configDataBase.portDB}/${configDataBase.dataBase}`);

//Configuracion JWT

const configJWT = {
    secretWordJWT: "JaVa$cRiPt", //  PALABRA CLAVE DE JSONWEBTOKEN
}

//Configuracion Server

const configServer = {
    port: process.env.PORT || 3000 //  CONFIGURACION DEL PUERTO DE NUESTRO PROYECTO
}

module.exports = { sequelize, configJWT, configServer };