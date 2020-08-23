// primero se importa moongose

const mongoose = require('mongoose');

const ProyectoShema = mongoose.Schema({

    nombre:{
        type: String,
        // si es obligatorio
        required: true,
        // para que no tenga espacios al inicio y final 
        trim: true,
    },
    propietario:{

        // para guardar el id del usuario logiado
        // se guardo como referencia
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'

    },
    fechaCreacion:{

        type: Date,
        // para que guarde la fecha en que se hizo el registro 
        default: Date.now()

    }

});


module.exports = mongoose.model('Proyectos',ProyectoShema);