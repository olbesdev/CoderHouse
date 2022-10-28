const express = require('express')
const dotenv = require('dotenv').config()
const passport = require('passport')
const twitterStrategy = require('passport-twitter').Strategy


const user = [{id: 1, username: 'admin', password: 'admin'}]

const app = express()

const session = require('express-session');
app.use(session({ secret: 'SECRET' }));

passport.use(new twitterStrategy({
    consumerKey: process.env.YOUR_CONSUMER_KEY,
    consumerSecret: process.env.YOUR_CONSUMER_SECRET,
    callbackURL: 'http://localhost:4000/auth/twitter/callback'
    },
    function(token, tokenSecret, profile, done) {
        // console.log(profile.id)
        // return done(null, user)
        // // do something with the profile
        User.findOrCreate({ twitterId: profile.id }, function (err, user) {
            if(err) { return done(err) }
            return done(null, user)
        })
        return done(null, user)
    }   
))



app.get('/auth/twitter', passport.authenticate('twitter'))

app.get('/auth/twitter/callback', passport.authenticate('twitter', {
        successRedirect: '/success',
        failureRedirect: '/login'
    }
))

app.listen(4000, () => {
    console.log('Server is running on port 4000')
})


