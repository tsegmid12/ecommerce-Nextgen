const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    count:{
        type: Number,
        required: true
    },
    status:{
        type: String,
        required: true
    },
    sold:{
        type: Number,
    },
    description:{
        type: String,
        required: true
    }
})

const Products = mongoose.model("Product", productSchema);

module.exports = Products;