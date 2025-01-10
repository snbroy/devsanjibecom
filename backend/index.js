import express from "express"
import cors from "cors"
const app = express()
const PORT = 8080

import connectToDatabase from "./db/db.js"

import authRouter from "./routes/auth.js"
import orderRouter from "./routes/orderRouter.js"
import productRouter from "./routes/productRouter.js"
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cors())

connectToDatabase()

app.get('/', (req,res)=>{
    res.status(200).send({
        'ok': "called"
    })
})

app.use("/api/auth", authRouter)
app.use("/api/orders", orderRouter)
app.use("/api/products", productRouter)

app.listen(PORT, ()=>{
    console.log(`Successfully Listening on ${PORT}`)
})