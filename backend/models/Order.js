import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    orderId: {type: Number, require: true},
    email: {type: String, require: true},
    orderItems: [
        {
            name: {type: String, require: true},
            qty: {type: Number, require: true},
            image: {type: String, require: true},
            price: {type: Number, require: true},
            product: {type: mongoose.Schema.Types.ObjectId, ref: "product", require: true}
        }
    ],
    customerDetails: {
        name: {type: String, require: true},
        phone: {type: String, require: true},
    },
    shippingAddress: {
        address: {type: String, require: true},
        city: {type: String, require: true},
        postalCode: {type: String, require: true},
        country: {type: String, require: true},
        phone: {type: String, require: true},
    },
    
    paymentMethod: {type: String, },
    paymentResult: {
        id: {type: String},
        email_address: {type: String}
    },
    totalPrice: {type: Number, require: true},
    paidAt: {type: String, default: Date.now},
    createAt: {type: String, default: Date.now},
    updatedAt: {type: String, default: Date.now}
}, {
    timestamps: true
})

const Order = mongoose.model("order", orderSchema)
export default Order;