const {response} = require('express');
const Evento = require('../models/Evento');


const getEventos = async(req, res = response) => {

    const eventos = await Evento.find() //Como a find no le puse parametros entonces traigo todos los eventos de la BBDD
                                .populate('user', 'name'); //estoy haciendo referencia al user y que me traiga solo el name. SI quisiera traer tambien el password lo tendría que poner asi (sin separar por comas): 'name password')
    res.json({
            ok: true,
            eventos
    });
}

const crearEvento = async( req, res = response ) => {

    const evento = new Evento( req.body );

    try {

        evento.user = req.uid;

        const eventoGuardado = await evento.save();
   
        res.status(201).json({
            ok: true,
            evento: eventoGuardado
             
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor, hable con el administrador del sistema.'
        });
    }

} 

const actualizarEvento = async( req, res = response ) => {

    const eventoId = req.params.id;
    const uid = req.uid;

    //como tengo que interactuar con la base de datos y puede fallar, entonces uso un try catch
    try {

        const encontrarEventoById = await Evento.findById(eventoId);
        if ( !encontrarEventoById ){
            return res.status(404).json({
                ok: false,
                msg: `No existe evento con ese id ${eventoId}`
                 
            })    
        };

        //PAra no dejar a una persona, editar el evento de otro usuario
        if ( encontrarEventoById.user.toString() !== uid ) {
            res.status(401).json({
                ok: false,
                msg: 'No tiene permiso para editar este evento'
            })
        };

        const eventoNuevo = {
            ...req.body, //desestructuro aca todo lo que viene del body: title, notes, etc
            //adicionalmente agrego el user
            user: uid //lo coloco aca porque en la petición no viene el id del usuario

        };

        await Evento.findByIdAndUpdate( eventoId ); 
        
        res.status(201).json({
            ok: true,
            
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor, hable con el administrador del sistema.'
        });
    }

}

const eliminarEvento = async( req, res = response ) => {

    const eventoId = req.params.id;
    const uid = req.uid;

    try {

        const encontrarEventoById = await Evento.findById(eventoId);
        if ( !encontrarEventoById ){
            return res.status(404).json({
                ok: false,
                msg: `No existe evento con ese id ${eventoId}.`
                 
            })    
        };

        if ( encontrarEventoById.user.toString() !== uid ) {
            res.status(401).json({
                ok: false,
                msg: 'No tiene permiso para eliminar este evento'
            })
        };

        const eventoEliminado = await Evento.findByIdAndDelete( eventoId, {new: true} );

        res.status(201).json({
            ok: true,
            encontrarEventoById
             
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor, hable con el administrador del sistema.'
        });
    }


}

module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}