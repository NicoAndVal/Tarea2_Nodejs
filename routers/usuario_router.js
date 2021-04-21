const express = require('express');


const {
    listar,
    guardar,
    borrar,
    actualizar
} = require('../controller/usuarios_controller');

const router = express.Router();

router.get('/usuario', listar);
router.put('/usuario/:id', actualizar);
router.delete('/usuario/:id', borrar);
router.post('usuario', guardar);

module.exports = router;

