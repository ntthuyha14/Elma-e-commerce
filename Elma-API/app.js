const express = require('express')
const app = express()
const path = require('path')
const googleSetup = require('./google')
const bodyParser = require('body-parser')

// ghi nhật ký các yêu cầu http từ UI
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')
const passport = require('passport')
const cookieSession = require('cookie-session')
// Lỗi không sử dụng được
// const authJwt = require('./helper/jwt')
// const error_handler = require('./helper/error-handler').default
// import authJwt from './helper/jwt'

app.use(cors())
app.options('*', cors())
require('dotenv/config')

// middleware
app.use(bodyParser.json())
app.use(morgan('tiny'))
app.use('/public/uploads', express.static(__dirname + '/public/uploads'))
// app.use(authJwt)
// app.use(error_handler);

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000') // Replace with your domain
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    next()
})

app.set('view engine', 'jade')
app.set('views', path.join(__dirname, './views'))
app.use(express.static(path.join(__dirname, 'public')))

// Routers
const product_router = require('./routers/products')
const category_router = require('./routers/categories')
const order_router = require('./routers/orders')
const user_router = require('./routers/users')
const cartRouter = require('./routers/carts')
const authGoogle = require('./routers/auth')
const vnpay = require('./routers/vnpay')
const api = process.env.API_URL

app.use(`${api}/categories`, category_router)
app.use(`${api}/products`, product_router)
app.use(`${api}/orders`, order_router)
app.use(`${api}/users`, user_router)
app.use(`${api}/carts`, cartRouter)
app.use(`${api}/auth`, authGoogle)
app.use(`${api}/vnpay`, vnpay)

// mongodb connect
mongoose
    .connect(process.env.CONNECTION_STRING, {
        dbName: 'ecommerce',
    })
    .then(() => {
        console.log('Database connection is ready')
    })
    .catch((err) => {
        console.log(err)
    })
const port = process.env.PORT || 8080
app.listen(port, () => {
    // console.log('Server in running http://localhost:2000/api/v1/')
    console.log('Server in running on port', port)
})
