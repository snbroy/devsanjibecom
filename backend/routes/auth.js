import express from "express"
import { login, register, updateUser } from "../controllers/authController.js";
const router = express.Router()

router.post('/login', login)
router.post('/register', register)
router.post('/updateUser', updateUser)

export default router;