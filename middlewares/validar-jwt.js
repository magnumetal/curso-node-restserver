const { response } = require('express');
const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');

const validarJWT = async(req, res = response, next ) => {

    const token = req.header('x-token');
    if ( !token ) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try {

        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

        // leer el usuario que correspondo el id
        const usuario = await Usuario.findById( uid );

        if ( !usuario ){
            return res.status(401).json({
                msg: 'No existe en BD'
            });
        }

        // verificar si el uuid esta activo
        if( usuario.activo ){
            return res.status(401).json({
                msg: `Usuario inactivo`,
                usuario
            });
        }


        req.usuario = usuario;

        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        });
    }

   

}


module.exports = {
    validarJWT
}