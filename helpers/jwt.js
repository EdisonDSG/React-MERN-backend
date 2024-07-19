const jwt = require('jsonwebtoken');

const generarJWT = ( uid, name ) => {

    return new Promise(( resolve, reject ) => {
        
        const payload = { uid, name };
        
        jwt.sign( payload, process.env.SECRET_JWT_SEED, {
            //en este parametro es para firmar o alterar la duración de este token, ejemplo, que espire en 2 hs.
            expiresIn: '2h'
        }, (err, token) => {
            if( err ){
                console.log(err);
                reject('No se pudo generar el token');
            }
            
            resolve( token );
            
        })
    })
}

module.exports = {
    generarJWT
}