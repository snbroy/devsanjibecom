import express from "express"
const router = express.Router();


import productRoutes from './productRouter.js';
import userRoutes from './auth.js';
import orderRoutes from './orderRouter.js';

// Use the routes
router.use('/products', productRoutes);
router.use('/users', userRoutes);
router.use('/orders', orderRoutes);

export default router;