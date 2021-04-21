var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var schemaOrden = new Schema({
    usuario: {
        nombre: {
            type: String,
            require: true
        },
        email: {
            type: String,
            required: true
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    productos: [{
        producto: {
            type: Object,
            required: true
        },
        cantidad: {
            type: Number,
            required: true
        },
    
    }],
    total: {
        type: Number,
        required: true
    },
    fecha_orden: {
        type: Date,
        required: true,
        default: Date.now
    }
})

schemaOrden.methods.generarOrden = async function (docUsuario) {
    
    docUsuario = await docUsuario.populate('cart.items.productId', '-stock -vendidos -disponibles').execPopulate();


    console.log(docUsuario)

    let total = 0;

    let producto = docUsuario.cart.items.map(item => {
        total += item.cantidad * item.productId._doc.precio;

        return {
            producto: item.productId._doc,
            cantidad: item.cantidad
        }
    })

    console.log('Productos', producto);

    this.productos = producto;
    this.total = total;
    await this.save();
    await docUsuario.limpiarCarro();
    return this;
}

const model = mongoose.model('modelOrden', schemaOrden);
module.exports = model;