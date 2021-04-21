var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var schemaUsuario = new Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'USER_ROLE'
    },
    disponible: {
        type: Boolean,
        default: true
    },
    cart: {
        items: [{
            productId: {
                type: Schema.Types.ObjectId,
                ref: 'modelProducto'
            },
            cantidad: {
                type: Number,
                required: true
            },
            total: {
                type: Number,
                required: true
            }
        }]
    }
})


schemaUsuario.methods.addCarro = function (producto) {
    
    let index = this.cart.items.findIndex(item => {
        return item.productId.toString() == producto._id.toString()
    })
    
    let _cantidad = 1;
    let newCartItems = [...this.cart.items];
    
    if (index >= 0) {
        _cantidad = this.cart.items[index].cantidad + 1;
        newCartItems[index].cantidad = _cantidad;
        newCartItems[index].total = _cantidad * producto.precio;

    } else {
        newCartItems.push({
            productId: producto._id,
            cantidad: _cantidad, 
            total: producto.precio
        })
    }

    this.cart.items = newCartItems;
    return this.save();
}

schemaUsuario.methods.removeCarro = function (producto) {
    let index = this.cart.items.findIndex(item => {
        return item.productId.toString() == producto._id.toString()
    })
    
    let _cantidad = 0;
    let carrito = [...this.cart.items];


    if (index >= 0) {
        _cantidad = this.cart.items[index].cantidad - 1;
        carrito[index].cantidad = _cantidad;
        carrito[index].total = _cantidad * producto.precio;
        if (_cantidad == 0) {
            delete carrito[index];
        }
    }
    
    this.cart.items = carrito;
    return this.save();
    
    
}

schemaUsuario.methods.limpiarCarro = function() {
    this.cart = { items: [] };
    return this.save();
}

const model = mongoose.model('modelUsuario', schemaUsuario);
module.exports = model;