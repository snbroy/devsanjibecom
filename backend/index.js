import express from "express"
import cors from "cors"
const app = express()
const PORT = 8080

import connectToDatabase from "./db/db.js"

import authRouter from "./routes/auth.js"
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())

connectToDatabase()

app.get('/', (req,res)=>{
    res.status(200).send({
        'ok': "called"
    })
})

app.post('/login', login)
app.post('/register', register)
app.post('/updateUser', updateUser)

app.use("/api/auth", authRouter)

app.listen(PORT, ()=>{
    console.log(`Successfully Listening on ${PORT}`)
})