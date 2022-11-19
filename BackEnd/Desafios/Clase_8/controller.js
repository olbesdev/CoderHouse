const fs = require('fs')
class Producto {
    constructor(ruta){
        this.ruta = ruta
    }

    async #readFileFunction(ruta){
        let file = await fs.promises.readFile(ruta, 'utf-8')
        let parseFile = await JSON.parse(file)
        return parseFile
    }

//Agregar producto a un array ✅ 
    async save(objeto){
        try{
            let dataArch = await this.#readFileFunction(this.ruta, 'utf-8') //Lee el archivo de la ruta especificada en formato texto
            if (dataArch.length) { //Condicion 
                //Si dataArchParse.length != a cero(0) genera un nuevo objeto y "id" consecutivo del anterior
                await fs.promises.writeFile(this.ruta, JSON.stringify([...dataArch, {...objeto, id: dataArch[dataArch.length - 1].id + 1} ], null, 2))
            } else {
                //Si devuelve falso ó cero(0) dataArchParse.lenght => Crea un nuevo objeto
                await fs.promises.writeFile(this.ruta, JSON.stringify( [{...objeto, id: 1}], null, 2))
            }
            //Mostramos confirmación de Producto guardado por consola. Se muestra el ID generado.
            return(`Producto guardado. Se identifica con el ID: ${ dataArch[dataArch.length - 1].id + 1}`)
            //console.log(`Producto guardado. Se identifica con el ID: ${dataArchParse.length + 1}`)
        }catch (error) {
            console.log(`Algo salío mál (en .save) ${error}`)
        }
    
    }

//Actualizar producto por ID
    async updateById(objeto) {
        try {             
            let dataArch = await this.#readFileFunction(this.ruta, 'utf-8') //Lee el archivo txt
            const objIndex = dataArch.findIndex(producto => producto.id === objeto.id) // -1 o la posicion del objeto
    console.log(objIndex)
            if (objIndex !== -1) {
                // Existe
                dataArch[objIndex] = objeto
                await fs.promises.writeFile(this.ruta, JSON.stringify( dataArch, null, 2))  
                return {msg: 'Producto ha sido actualizado'}
                //console.log(dataArch)
            } else {
                // no existe
                return {error: 'El producto no existe'}
            }           
            
        } catch (error) {
            console.log(error)
        }            
       
    }
//Mostrar producto por el ID ✅ 
    async getById(id){
        try {
            let dataArch = await this.#readFileFunction(this.ruta, 'utf-8') //Lee el archivo txt
            let producto = dataArch.find(producto => producto.id === id)
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
                let dataArch = await this.#readFileFunction(this.ruta, 'utf-8') //Lee el archivo txt
                if (dataArch.length) { //Comprueba si no existe registros/productos en el archivo txt
                    return dataArch
                    //console.log(dataArchParse) //Muestra por consola los productos
                } else {
                    return null
                }
            }catch (error){
                console.log(error)
            }
    }

//Eliminar Producto por ID ✅ 
        async deleteById(id){
            try {
                let dataArch = await this.#readFileFunction(this.ruta, 'utf-8')
                let producto = dataArch.find(producto => producto.id === id)
                    if (producto) {
                    const dataArchParseFiltered = dataArch.filter(producto => producto.id !== id)
                    await fs.promises.writeFile(this.ruta, JSON.stringify(dataArchParseFiltered, null, 2), 'utf-8')
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
                let dataArch = await this.#readFileFunction(this.ruta, 'utf-8') //Lee el archivo de la ruta especificada en formato texto
                let randomItem = dataArch[Math.floor(Math.random() * dataArch.length)]
                return(randomItem)

            } catch (error) {
                console.log(error)
            }
    }

}

module.exports = { Producto }