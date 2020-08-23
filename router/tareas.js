const express = require('express');

const router = express.Router();

// incluimos el controller
const TareaController = require('../controller/tareaController');

// Importamos express validater
const { check } = require('express-validator');

// Importamos el middleware 
const auth = require('../middleware/auth');


//crea tarea a un proyecto
//api/tareas
router.post('/',
    auth,
    [   check('nombre','El nombre de la tarea es obligatorio').not().isEmpty(),
        check('proyecto','El nombre del proyecto es obligatorio').not().isEmpty(),
    ],
    TareaController.crearTarea
);

// regresa las tareas pro poryecto
router.get('/',
    auth,
    TareaController.TareasProyectos
);


//api/tarea
// Actualizar estado de tarea
router.put('/:id',
    auth,
    TareaController.actualizarTarea
);

//Eliminar una tarea 
router.delete('/:id',
    auth,
    TareaController.eliminarTarea
);


module.exports = router;