
const data = [
    {
        id: 123,
        usuario:"user1"
    },
    {
        id: 124,
        usuario:"user2"
    },

]

//Listar categorias
function listar(req,res) {
    res.json({
       data:data
   }) 
}

//Guardar Categorai

function guardar(req,res) {
    res.json({
        message:"Guardado"
    })
}

function borrar(req,res) {
    res.json({
         message:'Eliminado'
     })
}

function actualizar(req,res) {
    res.json({
        message:'Actualizado'
    })
}


module.exports = {
    listar,
    guardar,
    borrar,
    actualizar
};