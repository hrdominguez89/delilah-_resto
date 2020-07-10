const { sequelize } = require("../config/config");

module.exports = {

    async getUsers() {
        const users = await sequelize.query("SELECT * FROM users", {
            type: sequelize.QueryTypes.SELECT
        });
        return users;
    },

    async findUser(columnName, valueToSearch) {
        const userFound = await sequelize.query(`SELECT * FROM users WHERE ${columnName} = :valueToSearch limit 1`, {
            replacements: { valueToSearch: valueToSearch },
            type: sequelize.QueryTypes.SELECT
        });
        return userFound;
    },

    async registerUser(userData) {
        const { username, password, nameAndLastname, phone, address, email } = userData;
        userInserted = await sequelize.query('INSERT INTO users (username, password, nameAndLastname, phone, address, email, dateCreated, dateModified) VALUES (:username, :password, :nameAndLastname, :phone, :address, :email, current_timestamp(), current_timestamp())', {
            replacements: { username: username, password: password, nameAndLastname: nameAndLastname, phone: phone, address: address, email: email }
        });
        return userInserted;
    }
}