// incluimos el modelo O esquema
const Proyecto = require('../models/Proyectos');

// imporatamos express validater para poder validar los campos que se definen en usuarios.js se necesita instalar con npm
const { validationResult } = require('express-validator');

// funcion que te permite crear un proyecto
exports.crearProyecto = async(req, res) => {

     // Revisar si hay errores
     const errores = validationResult(req);
     // genera un areglo 
     if(!errores.isEmpty()){
         return res.status(400).json({errores: errores.array()})
     }

    try {

        // creamos un proyecto
        const proyecto = new Proyecto(req.body);

        //Guardamos el creador del proyecto, que se creo la carpeta middleware y el archivo auth para verificar la validacion 
        // del token y despues crear el proyecto
        // con jwt
        proyecto.propietario = req.usuario.id;

        //guardamos el proyectos
        proyecto.save();

        res.json(proyecto);
        
    } catch (error) {
        
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}

// Funcion que te permite obtener los proyectos creados por un usuario
exports.obtenerProyectos = async(req, res) => {

    try {
        
        // Para obtener todos los proyectos
        // Se le señala que campo debe cumplir para que regresar la consulta 
        // si deseas cambiar el orden solo agrega al final .sort({propietario: -1})
        const proyectos = await Proyecto.find({propietario: req.usuario.id});
        res.json({proyectos});

    } catch (error) {
        res.status(500).send('Hubo un error');
    }

}

// Funcion que que actualiza un proyecto 

exports.actualizarProyecto = async(req,res) => {

     // Revisar si hay errores
        const errores = validationResult(req);
    // genera un areglo 
        if(!errores.isEmpty()){
            return res.status(400).json({errores: errores.array()})
        }

    // Extraero la informacion del proyecto
    const {nombre} = req.body;
    // Variable que almacenara el proyecto actualizado 
    const nuevoProyecto = {};

    // Verifacamos que exista un nombre
    if(nombre){
        nuevoProyecto.nombre = nombre;
    }

    try {

        // Verifiacar o revisar el id del proyecto 
        let proyecto = await Proyecto.findById(req.params.id);
        
        // verificar si el proyecto existe o no 
        if(!proyecto){
            return res.status(404).json({msg:'Proyecto no existente'});
        }

        // verificar el creador del proyecto 
        // Verificar si el creador del proyecto es el mismo al que esta logeado 
            if(proyecto.propietario.toString() !== req.usuario.id){
                return res.status(401).json({msg:'No Autorizado'});
            }

        // Actualizar el proyecto
        // primer parametro es el id del proyecto, despues la variabel que tiene el cambio a realizar y despues new: true
        proyecto = await Proyecto.findByIdAndUpdate({_id: req.params.id},{new:true});

        res.json(proyecto);
        
    } catch (error) {
        res.status(500).send('Hubo un error');        
    }

}



// Funcion que elimina un proyecto
exports.EliminarProyecto = async(req,res) => {

    try {

        // Verifiacar o revisar el id del proyecto 
        let proyecto = await Proyecto.findById(req.params.id);
        
        // verificar si el proyecto existe o no 
        if(!proyecto){
            return res.status(404).json({msg:'Proyecto no existente'});
        }

        // verificar el creador del proyecto 
        // Verificar si el creador del proyecto es el mismo al que esta logeado 
        if(proyecto.propietario.toString() !== req.usuario.id){
            return res.status(401).json({msg:'No Autorizado'});
        }

        // Eliminar proyecto
        await Proyecto.findByIdAndRemove({_id: req.params.id});
        res.json({msg: 'Proyecto eliminado'});
        
        
    } catch (error) {
        res.status(500).send('hubo un erro');
    }


}

