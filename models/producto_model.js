const ModelCategoria = require('./categoria_model');

const mongoose = require('mongoose');
var Schema = mongoose.Schema


const validator_categoria = async (val) => {
    let rsp = await ModelCategoria.exists(
        {categoria_nombre:val}
    )

    return rsp;
}


var schemaProducto = new Schema({
    producto_nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
    },
    precio: {
        type: Number,
        required: true
    },
    stock: {
        type: String,
        required: true
    },
    vendidos: {
        type: Number,
        required: true,
        default: 0
    },
    disponibles: {
        type: Boolean,
        required: true,
        default:true
    },
    categoria_nombre: {
        type: String,
        required: true,
        validate: {
            validator: validator_categoria,
            message: 'Categoria no existe!'
        }
    },
    imagen: {
        data: Buffer,
        contentType: String
    },
},
    {
    timestamps: true
})

const model = mongoose.model('modelProducto', schemaProducto);
module.exports = model;