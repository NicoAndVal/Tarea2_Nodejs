var mongoose = require('mongoose');
var Schema = mongoose.Schema
var modelCategoria = new Schema({
    categoria_nombre: {
        type: String,
        required: true,
        unique: true
    }
});

const model = mongoose.model('ModelCategoria', modelCategoria);
module.exports = model;

