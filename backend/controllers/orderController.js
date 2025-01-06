import Order from "../models/Order.js"

const createOrder = (async (req, res) => {
    try {
        const { email, orderItems, shippingAddress, paymentResult,totalPrice, customerDetails } = req.body
        if (orderItems && orderItems.length === 0) {
            res.status(400)
            throw new Error('No order items')
        } else {
            console.log(req.body)
            const order = new Order({
                orderId: Math.floor(100000 + Math.random(), 900000),
                email,
                orderItems,
                shippingAddress,
                totalPrice,
                paymentResult,
                customerDetails
            })
            const newOrder = new Order(order)
            const createdOrder = await newOrder.save()
            // res.status(201).json(createdOrder)
            const respo = {
                orderId: createdOrder.orderId,
            }
            return res.status(200).json({sucess: true, data: respo})
        }
    } catch (error) {
        console.log(error)
        res.status(404).json({sucess: false, error: error.message})
    }
})

export { createOrder }