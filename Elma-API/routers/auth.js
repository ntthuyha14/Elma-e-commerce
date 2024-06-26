const router = require('express').Router()
const passport = require('passport')
router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/google/failed' }),
    (req, res) => {
        // User is authenticated, handle successful login here
        if (req.user) {
            res.status(200).json({
                error: false,
                message: 'Login successful',
                user: req.user,
            })
        } else {
            res.status(401).json({
                error: true,
                message: 'Login failure',
            })
        }
    },
)

router.get('/google/failed', (req, res) => {
    res.status(401).json({
        error: true,
        message: 'Login failure!    ',
    })
})

router.get('/google/success', (req, res) => {
    if (req.user) {
        res.status(200).json({
            error: false,
            message: 'Login successful',
            user: req.user,
        })
    } else {
        res.status(403).json({
            error: true,
            message: 'Not authorized',
        })
    }
})

router.get(
    '/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }),
)
router.get('/signout', (req, res) => {
    req.logout()
    res.redirect(process.env.CLIENT_URL)
})

module.exports = router
