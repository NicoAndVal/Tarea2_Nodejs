const ModelProducto = require('../models/producto_model');

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
const data = [
    {
        id: 123,
        categoria:'Polos',
        nombre:"polo rombos"
    },
    {
        id: 124,
        categoria:'Polos',
        nombre:"polo cuadrados"
    },

]

//ProductoById
function ProductoById(req, res, next,id) {
    let myquery = ModelProducto.findById(id);
    myquery
        .select('-imagen')
        .exec((err, docProducto) => {
             if (err || !docProducto) return errorHandler(docProducto, next, err);
        
            // docProducto = docProducto.toObject();
            // delete docProducto.imagen;

            req.docProducto = docProducto;
            next();
    })
}



//Listar categorias
function listar(req,res,next) {
    
    ModelProducto.find()
        .select('-imagen')
        .exec((err, items) => {
        if (err | items) {
            return errorHandler(items, next, err)
        }
        return res.json({
            item: items
        })
    })
    
     
}

//Guardar Categorai

function guardar(req,res,next) {
    
    console.log(req.body);

    let data = {
        producto_nombre: req.body.producto_nombre,
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        stock: req.body.stock,
        vendidos: req.body.vendidos,
        disponibles: req.body.disponibles,
        categoria_nombre: req.body.categoria_nombre
    }

    const modelProducto = new ModelProducto(data);


    if (req.files) {
        console.log(req.files);
        modelProducto.imagen.data = req.files.imagen.data;
        modelProducto.imagen.contenType = req.files.imagen.mimeType;
    }

    modelProducto.save((err, docProducto) => {
        if (err || !docProducto) return errorHandler(docProducto, next, err);

        return res.json({
            data: docProducto
        })
    })
}

//GetxId
function getsId(req, res, next) {
    return res.json({
        data: req.docProducto
    })
    
}

function borrar(req,res) {
    req.docProducto.disponibles = false;
    req.docProducto.save((err, item) => {
        if (err || !item) return errorHandler(item, next, err);

        return res.json({
            item: item
        })
    })
}

function actualizar(req, res, next) {
    
    let id = req.params.id;

    ModelProducto.findByIdAndUpdate(
        id,
        req.body,
        { new: true },
        (err, docProducto) => {
            if (err || !docProducto) return errorHandler(docProducto, next, err);

            return res.json({
                item:docProducto
            })
        }
    )
}

module.exports = {
    listar,
    guardar,
    borrar,
    actualizar,
    getsId,
    ProductoById
};