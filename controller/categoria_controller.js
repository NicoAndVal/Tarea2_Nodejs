const { Model } = require('mongoose');
const ModelCategoria = require('../models/categoria_model');

function errorHandler(data, next, err = null) {
        if (err) {
            return next(err);
        }

        if (!data) {
            
            let error = new Erro('No existe');
            error.statusCode = 404;
            return next(error);
        }
}
const data = [
    {
        id: 123,
        nombre:"POLOS"
    },
    {
        id: 124,
        nombre: "PANTALONES"
    }
]

//Listar categorias
function listar(req,res,next) {
    ModelCategoria.find().exec((err, items) => {
        if (err | items) {
            return errorHandler(items, next, err)
        }
        return res.json({
            item: items
        })
    })
}

//Guardar Categorai

function guardar(req, res,next) {
    
    let data = {
        categoria_nombre : req.body.categoria_nombre
    }
    modelCategoria = new ModelCategoria(data);
    modelCategoria.save((err, items) => {
        
        if (err | !items) {
            return errorHandler(items, next, err)
        }

        return res.json({
            data:items
        })

    })
}

function borrar(req,res) {
    const id = req.params.id

    ModelCategoria.findByIdAndDelete(id, (err, docCategoria) => {
         if (err) {
            return res.status(500).json({
                error: err
            })
        }

        if (!docCategoria) {
            return res.status(404).json({
                data: 'No existe'
            })
        }
        
        return res.json({
            item: docCategoria
        })
    })
}

function actualizar(req,res) {
    const id = req.params.id;

    const data = {
        categoria_nombre: req.body.categoria_nombre
    }

    ModelCategoria.findByIdAndUpdate(id, data, { new: true }, (err, docCategoria) => {
         if (err) {
            return res.status(500).json({
                error: err
            })
        }

        if (!docCategoria) {
            return res.status(404).json({
                data: 'No existe'
            })
        }
        
        return res.json({
            item: docCategoria
        })
    })

}


function getCategoria(req, res) {
    let id = req.params.id;

    ModelCategoria.findById(id, (err, docCategoria) => {
        if (err) {
            res.status(500).json({
                message:err
            })
        }
        res.json({
            data: docCategoria
        })
    })
}

module.exports = {
    listar,
    guardar,
    borrar,
    actualizar,
    getCategoria
};