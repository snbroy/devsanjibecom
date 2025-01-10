import express from "express"
import { fetchProducts } from "../controllers/ProductController.js";
const router = express.Router()

router.get('/fetch-product', fetchProducts)

export default router;