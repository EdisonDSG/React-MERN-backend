//configuración básica de express
const express = require('express');
require('dotenv').config(); //Para acceder a las variables de entorno que estan en el archivo .env
const { dbConnection } = require('./database/config');
const cors = require('cors');

console.log( process.env )

//creación del servidor de express
const app = express();

//Base de datos
dbConnection();

//CORS
app.use( cors() );

//Directorio publico
app.use( express.static('public') );

//lectura y parseo del body
app.use( express.json() ); //Las peticiones que vengan en formato json se procesan aca y se extrae su contenido.

//Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));



//escuchar peticiones
app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});



