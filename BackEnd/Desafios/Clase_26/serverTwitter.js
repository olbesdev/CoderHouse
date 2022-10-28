const express = require('express')
const dotenv = require('dotenv').config()
const expressSession = require('express-session')

const passport = require('passport')
const twitterStrategy = require('passport-twitter').Strategy



// console.log(process.env.TWITTER_CONSUMER_KEY)
passport.use(new twitterStrategy({
    consumerKey: process.env.YOUR_CONSUMER_KEY,
    consumerSecret: process.env.YOUR_CONSUMER_SECRET,
    callbackURL: 'http://localhost:4000/auth/twitter/callback'
},
    function (token, tokenSecret, profile, done) { 
        User.findOrCreate({ twitterId: profile.id }, function (err, user) {
            if (err) { 
                return done(err);                 
            }
            return done(err, user);
        })
        return done(err, user);
     }
))


const app = express()
app.use(expressSession({
    secret: 'secret'
}))

app.get('/home', (req, res) => {
    res.send('Hello Home!')
})

app.get('/auth/twitter', passport.authenticate('twitter'))

app.get('/auth/twitter/callback', passport.authenticate('twitter', { 
    failureRedirect: '/login' ,
    successRedirect: '/home'
}))


app.listen(4000, () => {
    console.log('Server is running on port 4000')
})


