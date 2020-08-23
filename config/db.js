// Indicamos que se necesita de mogoose
const mongoose = require('mongoose');

// Induicamos el uso del archivo .env para eso usamos dotenv
require('dotenv').config({path: 'variables.env'});

// Funcion para hacer la connecion 
const conectarDB = async() =>{
    
    try {
        
        await mongoose.connect(process.env.DB_MONGO,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        console.log('DB CONECTADA');

    } catch (error) {
        console.log('hubo un error de conecion');
        console.log(error);    
        // En caso de eeror detenemos la app
        process.exit(1); 
    }


}

//exportamos la funcion para que este disponible en todos los archivos
module.exports = conectarDB;