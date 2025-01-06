import User from "../models/Users.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const login = async(req, res) =>{
    
    try {
        res.type("application/json");
        const {email, password} = req.body
        console.log(email, password)
        const user = await User.findOne({email})
        
        if(!user){
            return res.status(404).json({sucess: false, error: "User is not found"})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(404).json({sucess: false, error: "Wrong Password"})
        }

        const token = jwt.sign({_id: user._id, role: user.role},process.env.JWT_KEY, {expiresIn: "10d"})

        return res.status(200).json({sucess: true, token, user:{_id: user.id, name: user.name, email: user.email}})

    } catch (error) {
        console.log(error)
        res.type("application/json");
        return res.status(404).json({sucess: false, error: error.message})
    }
}

const register = async(req, res) =>{
    try {
        const {name, email, password} = req.body
        const user = await User.findOne({ email }) 
        res.type("application/json");
        if(user){
            return res.status(404).json({sucess: false, error: "User is already registered"})
        }

        const hashpassword = await bcrypt.hash(password, 10)
        const newUser = new User({
            name,
            email,
            customerId: Math.floor(100000 + Math.random(), 900000),
            accountStatus: "active",
            password: hashpassword,
            role: 'user'
        })
        await newUser.save()
        return res.status(200).json({sucess: true, data: newUser})
    }
    catch(error){
        console.log(error)
        return res.status(404).json({sucess: false, error: error.message})
    }
}

const updateUser = async(req, res) =>{
    try {
        const {name, email} = req.body
        const user = await User.findOne({ email }) 
        res.type("application/json");
        if(!user){
            return res.status(404).json({sucess: false, error: "User is not found"})
        }

        user.name = name
        await user.save()
        return res.status(200).json({sucess: true, data: user})
    }
    catch(error){
        console.log(error)
        return res.status(404).json({sucess: false, error: error.message})
    }
}

export {login, register, updateUser}