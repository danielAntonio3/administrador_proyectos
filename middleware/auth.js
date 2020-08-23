
// este archivo se encargra de verificar y validar le token del usuario logiado o con intento de logeo

// incluir el el json web token 
const jwt = require('jsonwebtoken');


module.exports = function (req, res, next) {
    // leer el token del header
    const token = req.header('x-auth-token');

    // Revisamos si no hay token
        if(!token){
            return res.status(401).json({ msg: 'Permiso no valido' });
        }

    // Validamos el token
    try {
        // para verificar el token , primero se pasa el token y despues la palabra secreta
        const cifrado = jwt.verify(token,process.env.SECRETA);

        // se agrega por el paylod authController
        req.usuario = cifrado.usuario;
        
        // para que valla al siguiente middleware
        next();

    } catch (error) {
        res.status(401).json({ msg: 'token no valido'});
    }

}