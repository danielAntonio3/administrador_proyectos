// importar el modelo (schema)
const Usuario = require('../models/Usuario');

// importamos la nueva dependencia es la que permite hashiar el password
const bcrypt = require('bcryptjs');

// imporatamos express validater para poder validar los campos que se definen en usuarios.js se necesita instalar con npm
const { validationResult } = require('express-validator');

// Importamos el token para mantener el inicios de session del usuario se necesita ser instalado con npm
const jwt = require('jsonwebtoken');


exports.autenticaUsuarios = async(req, res) => {

    // Revisar si hay errores
    const errores = validationResult(req);
    // genera un areglo 
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()})
    }

     // Extraemos el email y password del modelo usuario
     const {email,password} = req.body;

     try {
         
        // Revisar que sea un usuario registrado en la base de datos se pasa el valor que deseas comparar
        let usuario = await Usuario.findOne({email});

        // Verificamos si existe o no el usuario
        if(!usuario){
            return res.status(400).json({msg:'El usuario no existe'}); 
        }

        // si paso la validacion quiere decir que si existe el usuario
        // Verificamos su password
        // se tiene que desepcriptar ya que la contraseña se envia encriptada
        const passwordCorrecto = await bcrypt.compare(password, usuario.password);
        
        // verificamos si la contraseña es correcta
        if(!passwordCorrecto) {

            return res.status(400).json({msg:'contraseña incorrecta'});
        }

        // si todo es correcto entonces creamos el json web token
        // Crear y firmar el jwt
    const payload={
        usuario: {
            id:usuario.id
        }
    }

    // Despues se firma el jwt y se pasa el creado, la palabra secrea creada en el archivo de variable 
    jwt.sign(payload, process.env.SECRETA,{

        // Configuracion 
        // hora limite de abierta la sesion 
        expiresIn: 3600 // 1 hora

        // Verificaremos si hay un error
    }, (error,token) => {

        // Si hay un error
        if(error) throw error;

        // Mensaje de confimacion 
        res.json({ token })
    });

     } catch (error) {
        // Ver errores
        //console.log(error); 
     }

};


// Funcion que debuelve el usurio autenticado
exports.usuarioAutenticado = async(req,res) => {

    try {
        // Realizamos solicitud del usuario
        // con el select se le indica que campos no queremos
        const usuario = await Usuario.findById(req.usuario.id).select('-password');
        res.json({usuario});
        
    } catch (error) {
       console.log(error); 
       res.status(500).json({msg:'Hubo un error'});
    }

};