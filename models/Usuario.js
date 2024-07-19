const { Schema, model } = require('mongoose');
//Schema: es como un molde que define la estructura de los datos que se van a guardar en la base de datos.
//Model: es la conexión entre el Schema y la base de datos. Es como un puente que permite interactuar con la base de datos utilizando el Schema definido.

//Asi lucirán los usuarios:
const UsuarioSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
        },
    email:{
        type: String,
        required: [true, 'El email es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
        },
});

module.exports = model( 'Usuario', UsuarioSchema ); 
//El Model llamado Usuario es creado a partir del Schema UsuarioSchema. El Model Usuario es la representación de la colección de usuarios en la base de datos, y que cada documento en esa colección seguirá la estructura definida en el Schema UsuarioSchema.
