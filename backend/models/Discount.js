import mongoose from "mongoose"

const discountSchema = new Schema({
    code: {type: String, require: true},
    discount: {type: Number, require: true},
    expireAt: {type: Date, require: true}
}, {
    timestamps: true
})

const Discount = mongoose.model("discount", discountSchema)