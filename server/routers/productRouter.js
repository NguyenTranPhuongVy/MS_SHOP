const express = require('express');
const router = express.Router();
const { uploadImage } = require('../common/uploadImg');



const productController = require('../app/controllers/ProductController');


// *GET
router.get("/product/get-product", productController.getProduct);
router.get("/product/get-product-category", productController.getCategory);

// * POST 
router.post("/product/create-product", uploadImage('file')  ,productController.createProduct);
router.post("/product/category/create", productController.createCategory);

module.exports = router;
