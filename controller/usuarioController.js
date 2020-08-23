// importar el modelo (schema)
const Usuario = require('../models/Usuario');

// importamos la nueva dependencia es la que permite hashiar el password
const bcrypt = require('bcryptjs');

// imporatamos express validater para poder validar los campos que se definen en usuarios.js se necesita instalar con npm
const { validationResult } = require('express-validator');

// Importamos el token para mantener el inicios de session del usuario se necesita ser instalado con npm
const jwt = require('jsonwebtoken');


exports.crearUsuarios = async (req, res)=>{

    // Revisar si hay errores
    const errores = validationResult(req);
    // genera un areglo 
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()})
    }


    // Extraemos el email y password del modelo usuario
    const {email,password} = req.body;

    try {
        
    // Revisamos que el usuario registrado se aunico 
    let usuario = await Usuario.findOne({email});

    // Verificamos si el email ya esta regitrado en la base de datos
    if(usuario){
        return res.status(400).json(
                { msg:'Usuario ya existente' }
            )
    }


    // Crea el nuevo usuario 
        usuario = new Usuario(req.body);

    // Hashear el password
    // el salt se encarga de hacer contraseñas distintas
    const salt = await bcrypt.genSalt(10);

    // recibimos el password
    usuario.password = await bcrypt.hash(password, salt);

    // Guardar usuario
    await usuario.save();

    // Crear y firmar el jwt
    // primero se crea 

    const payload={

        usuario: {
            id:usuario.id
        }

    }


    // Despues se firma el jwt y se pasa el creado, la palabra sercrea creada en el archivo de variable 
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
       console.log(error);
       res.status(400).send('Hubo un error');
    }
    
}