const express = require('express');
const router = express.Router();
const { uploadImage } = require('../common/uploadImg');



const productController = require('../app/controllers/ProductController');


// *GET
router.get("/product/get-product", productController.getProduct);
router.get("/product/get-product-bin", productController.getBinProduct);
router.get("/product/get-product-note", productController.getNoteProduct);
router.get("/product/get-product-follow", productController.getFollowProduct);
router.get("/product/category/get-category", productController.getCategory);
router.get("/product/category/get-groupcategory", productController.getProductCategory);

// * POST 
router.post("/product/create-product", uploadImage('file'), productController.createProduct);
router.post("/product/category/create", productController.createCategory);
router.post("/product/delete-product/bin", productController.binProduct);

module.exports = router;