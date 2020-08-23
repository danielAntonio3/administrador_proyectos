// Ruta para crear nuevos usuarios
const express = require('express');
// Se coloco por que causaba un error
const router = express.Router();

// Importar nuevo controlador
const usuarioController = require('../controller/usuarioController');

// Importamos express validater
const { check } = require('express-validator');




// Creamos un usuario
// la siguiente es la ruta
// Es un midelwar
// api/usuario
router.post('/', 
    
    // se define las reglas
    [
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('email','Agrega un email válido').isEmail(),
        check('password', 'El password debe ser minimo de 6 caracteres').isLength({ min: 6 })
    ],

    usuarioController.crearUsuarios
);

module.exports = router;
