const express = require('express');

const router = express.Router();

// incluimos el controller
const ProyectoController = require('../controller/proyectoController');

// Importamos express validater
const { check } = require('express-validator');


// Importamos el middleware 
const auth = require('../middleware/auth');


//crea proyectos
//api/proyectos
router.post('/',
    auth,
    [check('nombre','El nombre del proyecto es obligatorio').not().isEmpty()],
    ProyectoController.crearProyecto
);

// para poder obtener los proyectos creados por el mismo usuario
router.get('/',
    auth,
    ProyectoController.obtenerProyectos
);

// Para actualizar un proyecto via ID
router.put('/:id',
    auth,
    [check('nombre','El nombre del proyecto es obligatorio').not().isEmpty()],
    ProyectoController.actualizarProyecto

);

// Para Eliminar un proyecto via ID
router.delete('/:id',
    auth,
    ProyectoController.EliminarProyecto
);

module.exports = router;
