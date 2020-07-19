# Delilah Restó  - Acámica - Héctor Ricardo Domínguez

API REST de pedidos de platos de comida de un restaurante

## Comenzando 🚀

_Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas._

### Pre-requisitos 📋

1 - Tener instalado NODE.JS Ver. 12.18.2 LTS o superior
2 - Tener instalado XAMMP / WAMMP / LAMP (esto es opcional, ya que solo lo necesitamos para tener un sistema de bases de datos local, en caso de tener una base de datos remoto, obviar este punto, mas adelante expico donde configurar esto)
3 - Tener instalado postman para realizar pruebas (opcional, tambien se puede ingresar a https://editor.swagger.io/ e importar el archivo delilah.yaml que se encuentra este mismo fichero);

### Instalación 🔧

Abrir nuestra base de datos (local o remota) crear una base de datos llamada delilah y luego importar el archivo delilah.sql que se encuentra dentro de la carpeta BD.

abrir la consola y posicionarse sobre la carpeta del proyecto y ejecutar el comando " npm install " para que se instalen todas las dependecias del proyecto, 

dentro de la carpeta config, se encuentra un archivo llamado config.js en el cual podemos configurar informacion de nuestra base de datos(usuario, password, direccion, puerto, nombre de la base de datos), la clave secreta del jSonWebToken, y el puerto de escucha de nuestro servidor.

por ultimo iremos a  https://editor.swagger.io/ e importaremos el archivo delilah.yaml, en donde encontraras la documentación de la API. si no modificaste nada del archivo config.js ya podes empezar con las pruebas desde la pagina de swagger, en caso de haber modificado, tendras que cambiar las mismas configuraciones en la pagina de swagger,

## Ejecutando las pruebas ⚙️

para comenzar a correr el servidor ejecutamos desde la consola posicionados en la carpeta de la api el comando "node index"

La base de datos ya cuenta con un usuario administrador aqui te dejo las credenciales

usuario: admin
password: delilah