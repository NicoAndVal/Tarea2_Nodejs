const express = require('express');

const app = express();


app.use(require('./categoria_controller'));
app.use(require('./productos_controller'));
app.use(require('./usuarios_controller'));

module.exports = app;