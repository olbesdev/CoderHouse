const express = require ('express');
const Producto = require ('./server')
const producto = new Producto('./productos.txt')
const app = express();


app.get ('/', (req, res) => {
    res.send ('<h1 style= color:blue;>Hola Mundo </h1>')
});

app.get('/productos', async(req, res) => {
    try {
        const productos = await producto.getAll()
        res.send(productos)
    } catch (error) {
        console.log(error)
    }
})

app.get('/productosRandom', async(req, res) => {
    try {
        const productos = await producto.randomItem()
        res.send(productos)
    } catch (error) {
    console.log(error)
}
})

const PORT = 8080;

const server = app.listen(PORT, () =>{
    console.log(`Escuchando en el puerto: ${server.address().port} `)
});

server.on('Ha sucedido un error', error => console.log(error))
