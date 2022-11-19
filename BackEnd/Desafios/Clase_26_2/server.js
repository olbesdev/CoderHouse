const express = require('express')
const jwt = require('jsonwebtoken')

const PRIVATE_KEY = 'mysecret'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const Users = [{ id: 1, name: 'admin', password: 'admin', email: 'f@gmail.com' }]

const generarToken = (user) => {
    const token = jwt.sign({data: user}, PRIVATE_KEY, {expiresIn: '24h'})
    return token
}

const auth = (req, res, next) => {
    const token = req.headers.authorization 
    if (!token) {
        res.status(401).json({error: 'Usuario no autorizado'})
    }

    jwt.verify(token, PRIVATE_KEY, (err, decoded) => {
        if (err) {
            res.status(401).json({error: 'Usuario no autorizado'})
        }
        req.user = decoded.data
        console.log(decoded)
        next()
    })
    next()
}

app.get('/users', auth,(req, res) => {
    res.send('Hello Home!')
})

app.post('/register', (req, res) => {
    const { name, password, email } = req.body
   
    let user = Users.find(user => user.name === name)
   
    if(user){
        res.json({error: 'User already exists'})
    }

    user = { name, password, email }


    
    Users.push(user)
    // const {passwuser}
    const access_token = generarToken({ name, email })

    // console.log(user)
    // Users.push(user)
    res.json({access_token})
})

app.post('/login', (req, res) => {
    const { name, password } = req.body
    const user = Users.find(user => user.name === name && user.password === password)
    if(!user){
        res.json({error: 'User not found'})
    }
    const access_token = generarToken({ name, email: user.email })
    
    res.json({access_token})
})




app.listen(4000, () => {
    console.log('Server is running on port 4000')
})
