const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy

passport.use(
    new GoogleStrategy(
        {
            clientID:
                '828753067530-7p71n7f6crv515vqtudi9mvshtc0m31k.apps.googleusercontent.com',
            clientSecret: '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',
            callbackURL: '/google/callback',
            passReqToCallback: true,
        },
        (req, accessToken, refreshToken, profile, done) => {
            // hanle logic login
            console.log(req)
            console.log(accessToken)
            console.log(refreshToken)
            console.log(profile)
            done(null, profile)
        },
    ),
)

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})
