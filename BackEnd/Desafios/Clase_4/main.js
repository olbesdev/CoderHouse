
//Sync
/* const fs = require ('fs')

try {
    const fecha = new Date().toString()
    fs.writeFileSync('fyh.txt', fecha, 'utf-8')
    const archivo = fs.readFileSync('fyh.txt', 'utf-8')
    console.log(archivo)
}

catch(err) {
    console.log(err)
}
 */

//Async

const fs = require ('fs')

fs.writeFile('async.txt', 'utf-8', (err, contenido) => {

        if (err){
            console.log(err)
        } else {
            console.log(contenido)
        }
    }
)