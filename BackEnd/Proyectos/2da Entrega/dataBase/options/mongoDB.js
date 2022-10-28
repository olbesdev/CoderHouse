const mongoose = require('mongoose');

//mongodb+srv://olbesdev:53Jop.57Ail$@cluster0.6zxsnby.mongodb.net/?retryWrites=true&w=majority
const URL = 'mongodb+srv://olbesdev:53Jop.57Ail$@cluster0.6zxsnby.mongodb.net/?retryWrites=true&w=majority';

const connection = await mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

console.log('MongoDB Conectado')

module.exports = connection;
