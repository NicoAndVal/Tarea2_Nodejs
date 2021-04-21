const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');


const app = express();

const rutas = require('./routers/index');
//Middlewares
app.use(express.json());
app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
}));
rutas(app);

//Handler
app.use(function (err, req, res, next) {
  console.error(err);
  const status = err.statusCode || 500;
  const message = err.message;
  const data = err.data;

  res.status(status).json({
    message: message,
    data: data
  })
})

mongoose.connect('mongodb://localhost/node5G', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() => {
    console.log('Mongo ok');
})


app.listen(8080, () => {
    console.log('El servidor está listo')
})