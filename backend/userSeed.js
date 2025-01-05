import User from "./models/Users.js"
import bcrypt from "bcrypt"
import connectToDatabase from "./db/db.js"

const userRegister = async() =>{
    connectToDatabase()
    try {
        const hashpassword = await bcrypt.hash("admin", 10)
        const newUser =  new User({
            name: "Admin",
            email: "admin@test.com",
            password: hashpassword,
            role: "admin"
        })
        newUser.save()
    } catch (error) {
        console.log(error)
    }
}

userRegister()