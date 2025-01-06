import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    customerId: {type: String, require: true},
    name: {type: String, require: true},
    email: {type: String, require: true},
    password: {type: String, require: true},
    role: {type: String, enum:["admin","user"], require: true},
    accountStatus: {type: String, enum:["active", "inactive"], default: "inactive"},
    profileImage: {type: String},
    createAt: {type: String, default: Date.now},
    updatedAt: {type: String, default: Date.now}
})

const User = mongoose.model("user", userSchema)

export default User;