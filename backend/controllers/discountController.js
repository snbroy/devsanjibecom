const Discount = require("../models/Discount");

const discountController = async(req, res) => {
    console.log(req.body)
        const { code } = req.body
    try {
        res.type("application/json");
        const codeFound = await Discount.findOne({ code: code })
        if(codeFound){
            return res.status(404).json({sucess: true, error: "code is applied"})
        }  
        return res.status(404).json({sucess: false, error: "code is not valid"})
    } catch (error) {
        console.log(error)
        res.type("application/json");
        return res.status(404).json({sucess: false, error: error.message})
        
    }
};
export { discountController };