const express = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const logger = require('morgan')
require('dotenv').config()

const app = express()

app.use(logger('dev'))
app.use(cookieParser(process.env.COOKIES_SECRET || '55555'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const mongoConfig = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

app.use(session({
    secret: process.env.SESSION_SECRET || '123456',
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({mongoUrl: `mongodb+srv://${process.env.SECRET_USER}:${process.env.SECRET_PASSWORD}@${process.env.SECRET_URL}/?retryWrites=true&w=majority`})
}))

module.exports = app