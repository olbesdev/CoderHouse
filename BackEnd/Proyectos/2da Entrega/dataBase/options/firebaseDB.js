const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)

})
console.log('Firebsae Conectado')



const db = admin.firestore()
const queryProductos = db.collection('productos')
const queryCarritos = db.collection('carritos')

const FieldValue = admin.firestore.FieldValue;


module.exports = {
  queryCarritos,
  queryProductos,
  FieldValue
};


