/* ******** IMPORT / REQUIRE ******** */
const express = require ('express');
const { Producto } = require('./controller');
const producto = new Producto('./productos.txt')



const app = express()

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended:true }) )


/* ************  ************ */
const { Router } = express //Destructuring de Express
const routerProductos = Router() //Enrutado

routerProductos.get('/', async (req, res) => {
    try {
        const respuesta = await producto.getAll()
        res.json({
            mensaje: 'Se muestran todos los productos',
            respuesta
        })
    } catch (error) {
        console.log(error)
    }

})

routerProductos.post('/', async (req, res) => {

    try {
        const objetoProducto = req.body
        const respuesta = await producto.save(objetoProducto)
        res.json({
            mensaje: 'Producto guardado',
            respuesta
        })
    } catch (error) {
        console.log(error)
    }

})

routerProductos.get('/:id', async (req, res)=>{
    try {
        const{id} = req.params
        const objetoProducto = await producto.getById(parseInt(id))

        res.send({
            mensaje: objetoProducto
        })
    } catch (error) {
        console.log(error)
    }
})


routerProductos.put('/:id', async (req, res) => {
    try {
        const {id} = req.params
        const objetoProducto = req.body
        const respuesta = await producto.updateById({id: parseInt(id), ...objetoProducto})
        res.json({mensaje: respuesta})
    } catch (error) {
        console.log(error)
    }

} )
/* ************  ************ */
app.use('/api/productos', routerProductos)




/* ******** PORT CONFIG ******** */
const PORT = 8080;

const server = app.listen(PORT, () =>{
    console.log(`Escuchando en el puerto: ${server.address().port} `)
});

server.on('Ha sucedido un error', error => console.log(error))
