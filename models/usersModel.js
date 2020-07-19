const { sequelize } = require("../config/config");

module.exports = {

    async getUsers() {
        const users = await sequelize.query("SELECT id,username,nameAndLastname,email,phone,address,isAdmin,dateCreated,dateModified FROM users", {
            type: sequelize.QueryTypes.SELECT
        });
        return users;
    },
    async getUserById(idUser) {
        const user = await sequelize.query("SELECT id,username,nameAndLastname,email,phone,address,isAdmin,dateCreated,dateModified FROM users WHERE id=:id", {
            replacements: { id: idUser },
            type: sequelize.QueryTypes.SELECT
        });
        return user;
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
    },

    async deleteUserById(userId) {
        const deletedUser = await sequelize.query("DELETE FROM users WHERE id=:id", {
            replacements: { id: userId }
        });
        return deletedUser;
    },

    async updateUserById(userId, userData) {
        const { nameAndLastname, phone, address } = userData;
        const userUpdated = await sequelize.query("UPDATE users SET nameAndLastname = :nameAndLastname, phone = :phone, address = :address, dateModified = current_timestamp() WHERE id = :userId", {
            replacements: { nameAndLastname: nameAndLastname, phone: phone, address: address, userId: userId }
        })
        return userUpdated;
    }
}