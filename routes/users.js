const usersCtrl = require("../controllers/usersController");

//Endpoints of Users
module.exports = (app) => {
    app.post("/users", usersCtrl.registerUser);
    app.post("/users/login", usersCtrl.login);
    app.get("/users", app.isBearerAuth, usersCtrl.getUsers);
    app.get("/users/:id", [app.isBearerAuth, app.validateIdParams], usersCtrl.getUserById);
    app.put("/users/:id", [app.isBearerAuth, app.validateIdParams], usersCtrl.updateUserById);
    app.delete("/users/:id", [app.isBearerAuth, app.validateIdParams], usersCtrl.deleteUserById);
}

//Middlewares