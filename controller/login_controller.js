
const model = require('../models/categoria_model');
const Modelusuario = require('../models/usuario_model');

function errorHandler(data, next, err = null) {
        if (err) {
            return next(err);
        }

        if (!data) {
            
            let err = new Error('No existe');
            err.statusCode = 404;
            return next(err);
        }
}

function signup(req,res,next) {

    let data = {
        nombre: req.body.nombre,
        email: req.body.email,
        password: req.body.password
    }


    const modelusuario = new Modelusuario(data);
    modelusuario.save((err, docUsuario) => {
        if (err || !docUsuario) return errorHandler(docUsuario, next, err);


        res.json({
            data: docUsuario
        })
    })


}


module.exports = {
    signup
}