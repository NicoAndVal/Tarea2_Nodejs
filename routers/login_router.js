const express = require('express');

const {
    signup
} = require('../controller/login_controller');


const router = express.Router();

router.post('/signup', signup);

module.exports = router;