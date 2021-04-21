const express = require('express');


const {
    listar,
    guardar,
    borrar,
    actualizar,
    getsId,
    ProductoById
} = require('../controller/productos_controller');

const router = express.Router();
router.param('productoId', ProductoById);

router.get('/producto', listar);
router.get('/producto/:productoId', getsId); 
router.put('/producto/:id', actualizar);
router.delete('/producto/:productoId', borrar);
router.post('/producto', guardar);

module.exports = router;
