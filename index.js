
// Inportamos expreess
const express = require('express');

// connecion, primero importamos la funcion de conecion
const conectarDB = require('./config/db');

// Trabajar con cors 
const cors = require('cors');

// Crear el servidor
const app = express();

// Despues de iniciar expreess nos conectamos a la base de datos
conectarDB();

// Habilitamos cors
app.use(cors());

// Habilitamos express.json
app.use(express.json({extended: true}));


// Creacion de un puerto
const port = process.env.PORT || 4000;


// Importar rutas (router)
app.use('/api/usuarios',require('./router/usuarios'));
app.use('/api/auth',require('./router/auth'));
app.use('/api/proyectos',require('./router/proyectos'));
app.use('/api/tareas',require('./router/tareas'));


// Iniciamos el servirdor
app.listen(port, ()=>{
    console.log(`El servidor esta funcionando en el puerto ${port}`);
})