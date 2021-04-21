const ModelProducto = require('../models/producto_model');
const ModelUsuario = require('../models/usuario_model');


const addCarro = async (req, res, next) => {
    let productoId = req.body.productoId;
    let usuarioId = req.body.usuarioId;

    try {
        docProducto = await ModelProducto.findById(productoId).exec();
        console.log(docProducto);

        if (!docProducto) {
            err = new Error('No Exists');
            err.statusCode = 404;
            throw (err);
        }

        docUsuario = await ModelUsuario.findById(usuarioId).exec();
        docUsuario = await docUsuario.addCarro(docProducto);

        res.json(docUsuario);

    } catch (error) {
        next(error);
    }

}

const removeCarro = async (req, res, next) => {

    let productoId = req.body.productoId;
    let usuarioId = req.body.usuarioId;

     try {
        docProducto = await ModelProducto.findById(productoId).exec();
        if (!docProducto) {
            err = new Error('No Existe el producto que desea eliminar');
            err.statusCode = 404;
            throw (err);
        }

        docUsuario = await ModelUsuario.findById(usuarioId).exec();
        docUsuario = await docUsuario.removeCarro(docProducto);

        res.json(docUsuario);

    } catch (error) {
        next(error);
    }
}

//Listar carro
const listarCarro = async(req, res) => {
    
    let query = await ModelUsuario.findById(req.params.id).exec();

    query.populate('cart.items.productId','producto_nombre', (err, items) => {
        if (err) {
            return res.json(err)
        }

        return res.json(items);
    })
}

const limpiarCarro = async (req, res) => {
    let docUsuario = await ModelUsuario.findById(req.params.id).exec();
    await docUsuario.limpiarCarro();
}

module.exports = {
    addCarro,
    listarCarro,
    limpiarCarro,
    removeCarro
};