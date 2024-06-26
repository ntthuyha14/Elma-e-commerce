const mongoose = require('mongoose')

const order_item_schema = mongoose.Schema({
    quantity: {
        type: Number,
        require: true,
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    },
})

exports.OrderItem = mongoose.model('OrderItem', order_item_schema)
