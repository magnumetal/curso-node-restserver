const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const { crearProducto,
        obtenerProductos,
        obtenerProducto,
        actualizarProducto, 
        borrarProducto} = require('../controllers/productos');
const { existeProductoPorId, existeCategoria } = require('../helpers/db-validators');

const router = Router();

// Obtener todos los productos - publico
router.get('/', obtenerProductos);

// Obtener un producto por id - publico
router.get('/:id', [
    check('id', 'No es un id válido').isMongoId(), 
    check('id').custom( existeProductoPorId ),
    validarCampos,
 ], obtenerProducto);

// Crear una Producto - privado - cuanquier persona con un token
router.post('/', [ 
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un id válido').isMongoId(),
    check('categoria').custom( existeCategoria ),
    validarCampos,
 ], crearProducto);

// Actualizar - privado - cualquiera con token válido
router.put('/:id',[
    validarJWT,
    // check('categoria','No es un id de Mongo').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
], actualizarProducto );

// Borrar una Producto - Solo si es Admin
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos,
], borrarProducto);





module.exports = router;