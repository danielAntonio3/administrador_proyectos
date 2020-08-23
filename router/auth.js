// Ruta para autenticar usuarios
const express = require('express');
// Se coloco por que causaba un error
const router = express.Router();

// Importar nuevo controlador
const authController = require('../controller/authController');

// Importamos express validater
const { check } = require('express-validator');


const auth = require('../middleware/auth');

// Verifica usuarios
// la siguiente es la ruta
// Es un midelwar
// api/auth
// Iniciar sesison
router.post('/', 
    // le pasamos el controller
    authController.autenticaUsuarios
    
);

// Obtine el usuario logiado 
router.get('/',
    auth,
    authController.usuarioAutenticado

);

module.exports = router;
