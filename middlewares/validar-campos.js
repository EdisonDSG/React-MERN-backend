const { response } = require('express');
const { validationResult } = require('express-validator'); //con esto obtengo el resultado de la validación realizada por el middleware


const validarCampos = (req, res = response, next) => {
    //manejo de errores
    const errors = validationResult( req );
    if ( !errors.isEmpty() ){ //Si hay errores
        return res.status(400).json({
            ok: false,
            msg: errors.mapped()

        })
    } 
    next();

}

module.exports = {
    validarCampos
};