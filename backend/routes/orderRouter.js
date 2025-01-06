import express from "express"
import { createOrder, getOrderByEmail } from "../controllers/orderController.js";
const router = express.Router()

router.post('/create-order', createOrder)
router.get('/get-orders', getOrderByEmail)

export default router;
