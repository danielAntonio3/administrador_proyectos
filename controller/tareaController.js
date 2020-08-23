// importar el modelo (schema)
const Tarea = require('../models/Tareas');
// es necesario importar el modelo de proyecto
const Proyecto = require('../models/Proyectos');

// imporatamos express validater para poder validar los campos que se definen en usuarios.js se necesita instalar con npm
const { validationResult } = require('express-validator');


exports.crearTarea = async (req, res)=>{

     // Revisar si hay errores
     const errores = validationResult(req);
     // genera un areglo 
     if(!errores.isEmpty()){
         return res.status(400).json({errores: errores.array()})
     }

     
     try {

        // Extraer el proyecto y comprobamos que exista
        const { proyecto } = req.body;

        // validamos que el proyecto exista
        const Existeproyecto = await Proyecto.findById(proyecto);
        if(!Existeproyecto){
            return res.status(404).json({msg:'Proyecto invalido'});
        }

        // Revisamos si el proyecto actual pertenece al usuario logiado 
        if(Existeproyecto.propietario.toString() !== req.usuario.id){
            return res.status(401).json({msg:'No Autorizado'});
        }


        // Creamos la tarea 
        const tarea = new Tarea(req.body);
        await tarea.save();
        res.json({tarea});
         
     } catch (error) {
         res.status(500).send('Hubo un error');
     }



};

// Para regresar todas las tareas de un proyecto
exports.TareasProyectos = async(req,res) => {

    try {
        
        // Extraer el proyecto y comprobamos que exista
        const { proyecto } = req.query;

         // console.log(req.query);

        // validamos que el proyecto exista
        const Existeproyecto = await Proyecto.findById( proyecto );


        if(!Existeproyecto){
            return res.status(404).json({msg:'Proyecto invalido'});
        }

        // Revisamos si el proyecto actual pertenece al usuario logiado 
        if(Existeproyecto.propietario.toString() !== req.usuario.id){
            return res.status(401).json({msg:'No Autorizado'});
        }

        // Obtener la tareas por proyectos
        const tareas = await Tarea.find({proyecto});
        res.json(tareas);



    } catch (error) {
        
        res.status(500).send('Hubo un error');
        
    }

};


// para actualizar una tarea (El estado)
exports.actualizarTarea = async(req,res) => {


    try {
        
        // Extraer el proyecto y comprobamos que exista
        const { proyecto, nombre, estado } = req.body;

        // Si la tarea existe
        let tareaExistente = await Tarea.findById(req.params.id);

        // validamos que el proyecto exista
        const Existeproyecto = await Proyecto.findById(proyecto);

        if(!tareaExistente){
            return res.status(404).json({msg:'No existe la tarea'});
        }

        // Revisamos si el proyecto actual pertenece al usuario logiado 
        if(Existeproyecto.propietario.toString() !== req.usuario.id){
            return res.status(401).json({msg:'No Autorizado'});
        }

        // Crear un objeto con la nueva informacion 
        const nuevaTarea = {};
        // * Como ya estamos enviado todo el objeto entonces se la actualizacion se realiza de la siguiente manera
        nuevaTarea.nombre = nombre;
        nuevaTarea.estado = estado;

        // guardar la tarea
        tareaExistente = await Tarea.findOneAndUpdate({_id: req.params.id},nuevaTarea,{new:true});
        
         res.json(tareaExistente);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }


};


// funcion que elimina una tarea
exports.eliminarTarea = async(req,res) => {

    try {
        
        // * Extraer el proyecto y comprobamos que exista
        // ! cuando pases parametros con params tienes que usar req.query
        const { proyecto } = req.query;

        // Si la tarea existe
        let tareaExistente = await Tarea.findById(req.params.id);

        // validamos que el proyecto exista
        const Existeproyecto = await Proyecto.findById(proyecto);

        if(!tareaExistente){
            return res.status(404).json({msg:'No existe la tarea'});
        }

        // Revisamos si el proyecto actual pertenece al usuario logiado 
        if(Existeproyecto.propietario.toString() !== req.usuario.id){
            return res.status(401).json({msg:'No Autorizado'});
        }


        // Eliminar Tarea  
        await Tarea.findByIdAndRemove({_id: req.params.id});
        res.json({msg: 'Tarea eliminado'});


    } catch (error) {   
        console.log(error);
        res.status(500).send('Hubo un error');
    }


};