const fs = require('fs')
class Producto {
    constructor(ruta){
        this.ruta = ruta
    }
//Agregar producto a un array ✅ 
    async save(objeto){
        try{
            let dataArch = await fs.promises.readFile(this.ruta, 'utf-8') //Lee el archivo de la ruta especificada en formato texto
            let dataArchParse = JSON.parse(dataArch) //Parse a JavaScript (JSON) el archivo en formato texto y lo guardamos en la variable
            if (dataArchParse.length) { //Condicion 
                //Si dataArchParse.length != a cero(0) genera un nuevo objeto y "id" consecutivo del anterior
                await fs.promises.writeFile(this.ruta, JSON.stringify([...dataArchParse, {...objeto, id: dataArchParse.length + 1} ], null, 2))
            } else {
                //Si devuelve falso ó cero(0) dataArchParse.lenght => Crea un nuevo objeto
                await fs.promises.writeFile(this.ruta, JSON.stringify([{...objeto, id: dataArchParse.length + 1}], null, 2))
            }
            //Mostramos confirmación de Producto guardado por consola. Se muestra el ID generado.
            return(`Producto guardado. Se identifica con el ID: ${dataArchParse.length + 1}`)
            //console.log(`Producto guardado. Se identifica con el ID: ${dataArchParse.length + 1}`)
        }catch{
            console.log('Algo salío mál (en .save) ')
        }
    
    }
//Mostrar producto por el ID ✅ 
    async getById(id){
        try {
            let dataArch = await fs.promises.readFile(this.ruta, 'utf-8') //Lee el archivo txt
            let dataArchParse = JSON.parse(dataArch) //Paasa a formato JavaScript / JSON
            let producto = dataArchParse.find(producto => producto.id === id)
            if (producto) {
                return(producto) //Devuelve el producto con el ID solicitado
                //console.log(producto)
            } else {
                console.log(`El producto con el ID: ${id} no existe`)
            }
        } catch (error) {
            console.log(error)
        }
    }
//Mostrar todos los productos ✅ 
        async getAll(){
            try {
                let dataArch = await fs.promises.readFile(this.ruta, 'utf-8') //Lee el archivo txt
                let dataArchParse = JSON.parse(dataArch) //Pasa a formato JavaScript / JSON
                if (dataArchParse.length) { //Comprueba si no existe registros/productos en el archivo txt
                    return(dataArchParse)
                    //console.log(dataArchParse) //Muestra por consola los productos
                } else {
                    console.log('No hay productos registrados') //Si no existe datos en dataArchParse.lenght informa que no hay productos
                }
            }catch (error){
                console.log(error)
            }
        }
//Eliminar Producto por ID ✅ 
        async deleteById(id){
            try {
                let dataArch = await fs.promises.readFile(this.ruta, 'utf-8')
                let dataArchParse = JSON.parse(dataArch)
                let producto = dataArchParse.find(producto => producto.id === id)
                    if (producto) {
                    let dataArchParseFilter = dataArchParse.filter(producto => producto.id !== id)
                    await fs.promises.writeFile(this.ruta, JSON.stringify(dataArchParseFilter, null, 2))
                        return(`El producto con el ID: "${id}" ha sido eliminado`)
                        //console.log(`El producto con el ID: "${id}" ha sido eliminado`) 
                    } else {
                        console.log(`No se ha encontrado el producto con el ID: ${id}`)
                    }
            } catch (error) {
                console.log(error)
            }
        }
//Borrar todos los productos ✅  
        async deleteAll(){
            await fs.promises.writeFile(this.ruta, JSON.stringify([], null, 2), 'utf-8')
        }
//Seleccionar Item aleatoriamente
        async randomItem(){
            try {
                let dataArch = await fs.promises.readFile(this.ruta, 'utf-8') //Lee el archivo de la ruta especificada en formato texto
                let dataArchParse = JSON.parse(dataArch) //Parse a JavaScript (JSON) el archivo en formato texto y lo guardamos en la variable
                let randomItem = dataArchParse[Math.floor(Math.random() * dataArchParse.length)]
                return(randomItem)
                //console.log(randomItem)
            } catch (error) {
                console.log(error)
            }
        }

}

module.exports = Producto