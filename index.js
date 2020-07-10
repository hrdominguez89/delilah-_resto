const app = require('./app');
const { configServer } = require("./config/config");

app.listen(configServer.port, () => {
    console.log(`Servidor iniciado en puerto: ${configServer.port}`);
})