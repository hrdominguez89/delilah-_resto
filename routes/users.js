const usersCtrl = require("../controllers/usersController");

//Middlewares


//Endpoints of Users
module.exports = (app) => {
    app.post("/users", usersCtrl.registerUser);
    app.post("/users/login", usersCtrl.login);

}