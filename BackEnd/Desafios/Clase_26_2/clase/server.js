const express = require('express')
const jwt = require('jsonwebtoken')

const app = express()

const PRIVATE_KEY = 'myprivatekey'
const Users = [{id: 1, username: 'admin', password: 'admin'}]

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

function generarToken(user) {
    const token = jwt.sign({ data: user }, PRIVATE_KEY, { expiresIn: '24h' })
    return token
}


const auth = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).json({error: 'No autorizado'})
    }

    console.log(authHeader)    
    // const token = authHeader.split(' ')[1]
    // console.log(token)
    jwt.verify(authHeader, PRIVATE_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({error: 'No autorizado'})
        }
        req.user = decoded.data
        console.log(decoded.data)
        next()
    })
    // next()
}


app.post('/register', (req, res) => {
    const { username, password, email} = req.body
    
    let user = Users.find(user => user.username === username)
    if (user) {
        res.status(400).json({ message: 'User already exists' })
    }
    
    user = { username, password, email }

    Users.push(user)

    const acces_token = generarToken(user)
    res.json({ acces_token })
})

// LOGIN
app.post('/login', (req, res) => {

    const { username, password } = req.body
   
    let user = Users.find(user => user.username == username && user.password == password)
    if (!user) {
      return res.json({ error: 'credenciales invalidas' });
    }
   
    const access_token = generarToken(user)
   
    res.json({ access_token })
})

app.get('/users', auth, (req, res) => {
    res.json(Users)
})
   

const PORT = 4000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
