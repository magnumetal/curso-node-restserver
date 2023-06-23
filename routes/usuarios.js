
const { Router } = require('express');
const { check } = require('express-validator');


// const { validarCampos } = require('../middlewares/validar-campos');
// const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole,
        tieneRole,
        validarCampos,
        validarJWT } = require('../middlewares');

const { esRoleValido,
        emailExiste,
        existeUsuarioPorId } = require('../helpers/db-validators');
const { usuariosGet,
        usuariosPost,
        usuariosPut,
        usuariosDelete } = require('../controllers/usuarios');




const router = Router();

router.get('/', usuariosGet );

router.put('/:id',[
     check('id', 'No es un id válido').isMongoId(),
     check('id').custom( existeUsuarioPorId ),
     check('rol').custom( esRoleValido ),
     validarCampos
], usuariosPut);

router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña debe ser más de 6 caracteres').isLength({ min:6 }),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom(emailExiste),
    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom( esRoleValido ),
    validarCampos
], usuariosPost );

router.delete('/:id',[
    validarJWT,
    // esAdminRole, //fuerza a que el usuario sea administrador para eliminar
    tieneRole('ADMIN_ROLE','VENTAS_ROLE'),
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
], usuariosDelete);







module.exports = router;