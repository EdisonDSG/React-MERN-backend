const { Schema, model } = require('mongoose');
//Schema: es como un molde que define la estructura de los datos que se van a guardar en la base de datos.
//Model: es la conexión entre el Schema y la base de datos. Es como un puente que permite interactuar con la base de datos utilizando el Schema definido.

//Asi lucirán los usuarios:
const EventoSchema = Schema({
    title: {
        type: String,
        required: true,
    },
    notes: {
        type: String,
    },
    start: {
        type: Date,
        required: true,
    },
    end: {
        type: Date,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId, //esto le dice a mongoose que va a ser una referencia y se la especificamos abajo con ref: 'Usuario'
        ref: 'Usuario',
        required: true
    }

});

//Ahora voy a quitar de la respuesta __v y modificar como quiero se se muestre el _id. Es solo a nivel respuesta y no a nivel base de datos.
// {
//     "ok": true,
//     "evento": {
//         "title": "Almuerzo con Eduardo",
//         "notes": "Nos encontramos directamente en el restautante de siempre",
//         "start": "1970-01-01T00:00:00.001Z",
//         "end": "1970-01-01T00:00:00.001Z",
//         "_id": "6698f99ccb608b1c3eaca29c",
//         "user": "6695553fca4ae744ba5aa4c6",
//         "__v": 0
//     }
// }

EventoSchema.method('toJSON', function() { //uso function y no funcion de flecha porque necesito referencia al this
    const { __v, _id, ...object} = this.toObject(); //aca tengo la referencia de todo el objeto que se está serializando y extraigo lo que esta dentro de las {}.
    // el ...object es para almacenar todo lo demas, es decir todo menos __v, _id

    //Ahora hago un reemplazo en el object para que los atributos se llamen como yo quiera
    object.id = _id;
    return object;

})

module.exports = model( 'Evento', EventoSchema ); 
//El Model llamado Evento es creado a partir del Schema EventoSchema. 
//El Model Evento es la representación de la colección de eventos en la base de datos, y que cada documento en esa colección seguirá la estructura definida en el Schema EventoSchema.
