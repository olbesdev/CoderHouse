export default {
    PORT: process.env.PORT || 8080,
    mongoLocal: {
        client: 'mongodb',
        cnxStr: 'mongodb://localhost:27017/coderhouse'
    },
    mongoRemote: {
        client: 'mongodb',
        cnxStr: 'mongodb+srv://olbesdev:53Jop.57Ail@cluster0.6zxsnby.mongodb.net/?retryWrites=true&w=majority'
    },
    sqlite3: {
        client: 'sqlite3',
        connection: {
            filename: `./DB/ecommerce.sqlite`
        },
        useNullAsDefault: true
    },
    mariaDb: {
        client: 'mysql',
        connection: {
            host: 'localhost',
            user: 'coderhouse',
            password: 'coderhouse',
            database: 'coderhouse'
        }
    },
    fileSystem: {
        path: './DB'
    }
}
