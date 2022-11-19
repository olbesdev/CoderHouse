// Creamos y accedemos a la Base de Datos
use ecommerce
db.createCollection('mensajes')
db.createCollection('productos')
show.collections


/****************************/
//      ADD PRODUCTS        //
/****************************/
db.productos.insertMany([
  {name:'Producto 1', description:'descripcion producto 1', price:120},
  {name:'Producto 2', description:'descripcion producto 2', price:580},
  {name:'Producto 3', description:'descripcion producto 3', price:900},
  {name:'Producto 4', description:'descripcion producto 4', price:1280},
  {name:'Producto 5', description:'descripcion producto 5', price:1700},
  {name:'Producto 6', description:'descripcion producto 6', price:2300},
  {name:'Producto 7', description:'descripcion producto 7', price:2860},
  {name:'Producto 8', description:'descripcion producto 8', price:3350},
  {name:'Producto 9', description:'descripcion producto 9', price:4320},
  {name:'Producto 10', description:'descripcion producto 10', price:5000}
])

//Mostramos los productos de la coleccion PRODUCTOS
db.productos.find().pretty()


/****************************/
//      ADD MESSEGE        //
/****************************/
db.mensajes.insertMany([
  {from:'1@1.com', mensaje:'lorem ipsu'},
  {from:'2@2.com', mensaje:'lorem ipsu ipsy lor'},
  {from:'3@3-com', mensaje:'asdojajksd'},
  {from:'4@4.com', mensaje:'mensaje mensaje mensaje'},
  {from:'5@5.com', mensaje:'este es otro mensaje'}, 
  {from:'6@6.com', mensaje:'otro mensaje mas'}, 
  {from:'7@7.com', mensaje:'este es el sexto mensaje'},
  {from:'8@8.com', mensaje:'septimo mensaje'},
  {from:'9@9.com', mensaje:'lorem ipsu'},
  {from:'10@10.com', mensaje:'lorem'}
])

//Mostramos los mensajes de la coleccion Mensajes
db.mensajes.find().pretty()


//Mostramos la cantidad de documentos en la coleciones
db.mensajes.estimatedDocumentCount()
db.productos.estimatedDocumentCount()

//Agregamos un nuevo producto
db.productos.insertOne({name:'Producto nuevo', description:'Descripcion producto nuevo', price:750})

//Listamos los productos menor de 1000 pesos
db.productos.find({price: {$lt: 1000}})

//Listamos productos con precio entre 1000 y 3000
db.productos.find({$and: [{price: {$gte: 1000}}, {price: {$lte: 3000}}]}).pretty()

//Listamos productos con precios mayores a 3000
db.productos.find({price: {$gte: 3000}}).pretty()

//Listamos nombre del tercer producto mas barato
db.productos.find({}, {name:1, _id:0}).sort({price:1}).limit(1).skip(2)

//Cambiamos el stock:100 a todos los productos
db.productos.updateMany({}, {$set: {stock: 100}})

//Cambia el stock a 0 de los productos con precio mayor a 4000
db.products.updateMany({price: {$gte: 4000}}, {$set: {stock: 0}})


//Borramos productos con precios menor a 1000 pesos
db.productos.deleteMany({price: {$lt: 1000}})

//Creamos usuario PEPE de solo lectura para la DB ecommerce
db.createUser([{
  user:'pepe',
  pwd:'asd456',
  roles:[{ role:'read', db:'ecommerce'}]
}])