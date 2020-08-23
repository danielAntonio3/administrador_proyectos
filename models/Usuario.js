
// importante ya que este define la estucrura de la inyecion de la base de datos
// Importamos mongoose
const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);

// Crear esqema de usuarios 

const UsuarioSchema = mongoose.Schema({
    nombre:{
        // tipo
        type: String,
        // si es obligatorio
        required: true,
        // para que no tenga espacios al inicio y final 
        trim: true,
    },
    email:{
        type: String,
        required: true,
        trim: true,
        // que sea unico el registro no tenga repetido 
        unique: true
    },
    password:{
        type: String,
        required: true,
        trim: true

    },
    fechaRegistro:{
        type: Date,
        // para que guarde la fecha en que se hizo el registro 
        default: Date.now()
   
    }

});


// Exportamos el modelo primero es el nombre con el que se editificara y despues el esquema 
module.exports = mongoose.model('Usuario',UsuarioSchema);
