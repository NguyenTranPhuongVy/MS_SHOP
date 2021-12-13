import express from 'express';
import productController from '../controllers/ProductController.js';

const router = express.Router();

router.get('/product', productController.getProduct);

export default router;