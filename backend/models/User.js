const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true    
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        default: null
    },
    address: {
        type: String,
        default: null
    },
    wishlist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }],
    cart: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }],
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    verificationCode: {
        type: String,
        default: null
    },
    verificationCodeExpires: {
        type: Date,
        default: null
    },
    isVerified: {
        type: Boolean,
        default: false
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;