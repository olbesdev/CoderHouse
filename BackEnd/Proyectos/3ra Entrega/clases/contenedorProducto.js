module.exports = class ContenedorProducto {
    constructor(nombreTabla, nombreCollection) {
      this.nombreTabla = nombreTabla;
      this.nombreCollection = nombreCollection;
    }
  };


// const Knex = require('knex').default;

// /**
//  * Clase Contenedor de producto.
//  * @type {module.Contenedor}
//  * Constructor donde se pasan las opciones de conexion a BD y table el nombre de la tabla dentro de la BD.
//  */
// module.exports = class Contenedor {
//     constructor(options, tabla) {
//         this.knex = Knex({
//             client: 'mysql2',
//             connection: options
//         });
//         this.tabla = tabla;
//     }
//     async metodoSave(producto) {
//         await this.knex('articulos').insert({
//             titulo: producto.title,
//             thumbnail: producto.thumbnail,
//             price: producto.price,
//             code: producto.code
//         })
//     }
//     /**
//      * Metodo para obtener todos los productos
//      */
//     async getAll() {
//         try {
//             return await this.knex.select('*').from(this.tabla);
//         } catch (error) {
//             console.log("Error en getAll", error);
//             return [];
//         }
//     }
// }