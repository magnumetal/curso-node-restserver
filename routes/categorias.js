const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const { crearCategoria,
        obtenerCategorias,
        obtenerCategoria,
        actualizarCategoria, 
        borrarCategoria} = require('../controllers/categorias');
const { existeCategoria } = require('../helpers/db-validators');

const router = Router();

// Obtener todas las categorias - publico
router.get('/', obtenerCategorias);

// Obtener una categoria por id - publico
router.get('/:id', [
    check('id', 'No es un id válido').isMongoId(), 
    check('id').custom( existeCategoria ),
    validarCampos,
 ], obtenerCategoria);

// Crear una categoria - privado - cuanquier persona con un token
router.post('/', [ 
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos,
 ], crearCategoria);

// Modificar una categoria por id - privado
router.put('/:id', [
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom( existeCategoria ),
    validarCampos,
], actualizarCategoria);

// Borrar una categoria - Solo si es Admin
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom( existeCategoria ),
    validarCampos,
], borrarCategoria);





module.exports = router;