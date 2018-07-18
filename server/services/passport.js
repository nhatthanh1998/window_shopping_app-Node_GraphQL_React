const passport = require('passport')
const { User } = require('../model/user')
const googleStrategy = require('passport-google-oauth20').Strategy
const keys = require('../config/keys')
const facebookStrategy = require('passport-facebook').Strategy
import 'babel-polyfill'

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user)
    })
})


passport.use(new googleStrategy({
    clientID: keys.GOOGLE_CLIENT_ID,
    clientSecret: keys.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
    proxy: true
}, async (accessToken, prefeshToken, profile, done) => {
    const user = await User.findOne({
        googleId: profile.id
    })
    if (user) {
        done(null, user)
    } else {
        const newUser = new User()
        newUser.googleId = profile.id
        newUser.address = " "
        newUser.firstName = profile.name.givenName
        newUser.lastName = profile.name.familyName
        newUser.displayName = profile.displayName
        newUser.hourlyIncome = 0
        const createUser = await newUser.save()
        done(null, createUser)
    }
}))


passport.use(new facebookStrategy({
    clientID: keys.FACEBOOK_CLIENT_ID,
    clientSecret: keys.FACEBOOK_CLIENT_SECRET,
    callbackURL: "/auth/facebook/callback"
},
    function (accessToken, refreshToken, profile, done) {
        User.findOne({
            facebookId: profile.id
        }).then(user => {
            if (user) {
                return done(null, user)
            } else {
                const newUser = new User()
                newUser.facebookId = profile.id
                newUser.save().then(user => {
                    done(null, user)
                })
            }
        })
    }
))