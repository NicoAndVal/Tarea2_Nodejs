const express = require('express');

const {
    generarOrden
} = require('../controller/orden_controller');


const router = express.Router();

router.get('/orden/generar/:id',generarOrden)

module.exports = router;