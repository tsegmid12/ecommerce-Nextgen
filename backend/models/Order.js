const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    products:[{
        productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
        },
        quantity:{
            type: Number,
            required: true,
        }
    }],
    totalAmount: {
        type: Number,
        required: true
    },
    description: {
        type: String,
    },
    paymentStatus:{
        type: String,
        enum: ['pending', 'paid', 'failed', 'refunded'],
        default: 'pending'
    },
    orderStatus:{
        type: String,
        enum: ['processing', 'shipped', 'delivered', 'cancelled'],
        default: 'processing'
    },
},
{
    timestamps: true
})

module.exports = mongoose.model("Order", orderSchema);