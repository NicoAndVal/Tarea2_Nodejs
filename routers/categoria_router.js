const express = require('express');


const {
    listar,
    guardar,
    borrar,
    actualizar,
    getCategoria
} = require('../controller/categoria_controller');

const router = express.Router();

router.get('/categoria', listar);
router.put('/categoria/:id', actualizar);
router.delete('/categoria/:id', borrar);
router.post('/categoria', guardar);
router.get('/categoria/:id', getCategoria);

module.exports = router;
