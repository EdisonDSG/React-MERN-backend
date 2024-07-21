// //Acá esta toda la configuración para conectarse a la base de datos mongo

// const mongoose = require('mongoose');

// const dbConnection = async() => {
//     try {
//         await mongoose.connect( process.env.DB_CONNECTION );
//         console.log('Base de datos conectada');

//     } catch (error) {

//         throw new Error('Error a la hora de inicializar base de datos');
//     }
// }

// module.exports = {
//     dbConnection
// };

const mongoose = require( 'mongoose' );


const dbConnection = async () => {

  try {

    await mongoose.connect( process.env.DB_CONNECTION, {
      // useNewUrlParser: true, 
      // useUnifiedTopology: true,
      // useCreateIndex: true
    } );

    console.log( 'DB Online' );


  } catch ( error ) {
    console.log( error );
    throw new Error( 'Error a la hora de inicializar BBDD' );
  }


};


module.exports = {
  dbConnection
};