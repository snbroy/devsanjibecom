import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    id: {type: Number, require: true},
    title: {type: String, require: true},
    body_html: {type: String},
    vendor: {type: String, require: true},
    product_type: {type: String},
    created_at: {type: String},
    handle: {type: String},
    tags: {type: String},
    images: [
        {
            src: {type: String}
        }
    ],
}, {
    timestamps: true
})


const Product = mongoose.model("products", productSchema)
export default Product;