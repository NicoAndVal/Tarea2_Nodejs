const express = require('express');

const {
    addCarro,
    listarCarro,
    limpiarCarro,
    removeCarro
} = require('../controller/carrito_controlle');


const router = express.Router();

router.post('/carro', addCarro);
router.post('/removeCarro', removeCarro);
router.get('/carro/:id', listarCarro);
router.delete('/carro/:id', limpiarCarro)

module.exports = router;