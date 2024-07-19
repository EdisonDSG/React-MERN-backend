
const { Router } = require('express');
const { check } = require('express-validator'); 
const { validarCampos } = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate');
const router = Router();
const { validarJWT } = require('../middlewares/validar-jwt');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');

//validar las rutas con el JWT
router.use(validarJWT); //cualquier petición que se encuentre debajo de esto, va a tener que tener su token

//Obtener eventos
router.get( '/', getEventos );

//crear evento
router.post(
    '/',
    [
        check('title', 'El título es obligatorio').not().isEmpty(),
        check('start', 'La fecha de inicio es obligatoria').custom( isDate ),
        check('end', 'La fecha fin es obligatoria').custom( isDate ),
        validarCampos
    ],
    crearEvento
);

//Actualizar evento
router.put( 
    '/:id',
    [
        check('title', 'El título es obligatorio').not().isEmpty(),
        check('start', 'La fecha de inicio es obligatoria').custom( isDate ),
        check('end', 'La fecha fin es obligatoria').custom( isDate ),
        validarCampos
    ], 
    actualizarEvento );

//Actualizar evento
router.delete( '/:id', eliminarEvento );

module.exports = router;