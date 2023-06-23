

const {Usuario, Categoria, Producto, Role } = require('../models');

const esRoleValido = async(rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if ( !existeRol ){
        throw new Error(`El rol ${rol} no está registrado en la BD`);
    }
}

const emailExiste = async( correo = '') => {
    const existeEmail = await Usuario.findOne({ correo });
        if ( existeEmail ){
        throw new Error(`El correo: ${correo} ya existe`);
        }
}

const existeUsuarioPorId = async( id ) => {
    const existeUsuario = await Usuario.findById(id);
        if ( !existeUsuario ){
        throw new Error(`El id: ${ id } no existe`);
        }
}

const existeCategoria = async( id ) => {
    const existeCat = await Categoria.findById(id);
    if ( !existeCat ) {
        throw new Error(`La categoria con id ${id}, no existe`);
    }
}

/**
 * Productos
 */
const existeProductoPorId = async( id ) => {

    // Verificar si el correo existe
    const existeProducto = await Producto.findById(id);
    if ( !existeProducto ) {
        throw new Error(`El id no existe ${ id }`);
    }
}


module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoria,
    existeProductoPorId
}