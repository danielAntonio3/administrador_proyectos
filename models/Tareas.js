// Primero agregamos moogose

const mongoose = require('mongoose');

const TareaShema = mongoose.Schema({

    nombre:{
        type: String,
        // si es obligatorio
        required: true,
        // para que no tenga espacios al inicio y final 
        trim: true,
    },
    estado:{
        type:Boolean,
        default: false

    },
    fechaCreacion:{

        type: Date,
        // para que guarde la fecha en que se hizo el registro 
        default: Date.now()
    },
    proyecto:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Proyectos'

    }


});

module.exports = mongoose.model('Tareas',TareaShema);