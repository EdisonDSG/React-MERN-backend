
const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');


const crearUsuario = async( req, res = response ) => {
    //req: es la petición. Lo que la persona solicita. En este caso, la creación del usuario. 
    //res: es la respuesta que me da. 

    const { email, password } = req.body

    try {

        let usuario = await Usuario.findOne({ email });
        if ( usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya existe con ese correo.'
                })
        } 
        
        usuario = new Usuario( req.body );

        //Encriptación de contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(  password, salt );

        //Ahora si grabo el usuario en la base de datos con el password encriptado
        await usuario.save();

        //Ahora genero el JWT
        const token = await generarJWT( usuario.id, usuario.name );
    
        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token 
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor, hable con el administrador del sistema.'
        });
    }


};

const loginUsuario = async ( req, res = response ) => {

    const { email, password } = req.body;

    try {

        const usuario = await Usuario.findOne({ email });
        if ( !usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese correo.'
                })
        }

        //Confirmar los password
        const validPassword = bcrypt.compareSync( password, usuario.password );
        if( !validPassword ){
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña incorrecta.'
            })

        }

        //Si llegamos acá es porque se valido correctamente la contraseña en el if anterior
        //Ahora genero el JWT
        const token = await generarJWT( usuario.id, usuario.name );


        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });
        

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor, hable con el administrador del sistema.'
        });
    }

};

const revalidarToken = async ( req, res = response ) => {

    const {uid, name} = req;

    //nuevo jwt y retornarlo en esta petición
    const token = await generarJWT( uid, name );

    res.json({
        ok: true,
        token
    });
};


module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
    
}
