import Product from "../models/Products.js"

const fetchProducts = async(req, res) =>{
    try {
        res.type("application/json");
        const products = await Product.find()
        return res.status(200).json({sucess: true, data: products})
    } catch (error) {
        console.log(error)
        return res.status(404).json({sucess: false, error: error.message})
    }
}

const fetchProduct = async(req, res) =>{
    try {
        res.type("application/json");
        const product = await Product.findById(req.params.id)
        return res.status(200).json({sucess: true, data: product})
    } catch (error) {
        console.log(error)
        return res.status(404).json({sucess: false, error: error.message})
    }
}

export {fetchProducts, fetchProduct};