const productModel = require('../models/ProductModel');
const categoryModel = require('../models/CategoryModel');
const categoryProductModel = require('../models/ProductCategory');
const { typeCategory } = require('../../common/type');

class ProductController {
    // *[GET]
    getProduct = (req, res, next) => {
        productModel.find({
            bin: false
        }, function(err, data) {
            res.json({
                data: data,
                success: true
            })
        }).sort({
            dateCreate: -1
        })
    }

    getBinProduct = (req, res) => {
        productModel.find({
            bin: true
        }, function(err, data) {
            res.json({
                data: data,
                success: true
            })
        }).sort({
            dateCreate: -1
        })
    }

    getNoteProduct = (req, res) => {
        productModel.find({
            bin: false,
            active: true,
            note: true
        }, function(err, data) {
            res.json({
                data: data,
                success: true
            })
        }).sort({
            dateCreate: -1
        })
    }

    getFollowProduct = (req, res) => {
        productModel.find({
            bin: false,
            active: true,
            follow: true
        }, function(err, data) {
            res.json({
                data: data,
                success: true
            })
        }).sort({
            dateCreate: -1
        })
    }


    getCategory = (req, res) => {
        categoryModel.find({
            bin: false,
            active: true,
            type: typeCategory.PRODUCT
        }, function(err, data) {
            res.json({
                data: data,
                success: true
            });
        }).sort({
            name: -1,
        }).projection({
            _id: 1,
            name: 1
        });
    }


    getProductCategory = (req, res) => {
        categoryProductModel.find({
            active: true,
        }, function(err, data) {
            res.json({
                data: data,
                success: true
            })
        }).projection({
            _id: 1,
            idProduct: 1,
            idCategory: 1
        });
    }

    checkError = (query) => {

        const checkUser = 'Phuongvy-nt';
        if (query.userAPI == checkUser) {
            return true;
        }
        return false;
    }

    // ![POST]

    // Thêm mới
    createProduct = (req, res) => {

        const newProduct = new productModel(req.query);
        newProduct.image = req.file.filename;

        this.groupProductCategories(newProduct._id, req.query.category);
        newProduct.save();

        res.json({
            success: true,
        })
    }

    createCategory = (req, res) => {
        const newCategory = new categoryModel(req.query);
        newCategory.type = typeCategory.PRODUCT;
        newCategory.save();

        res.json({
            success: true,
        })
    }

    // Xoá

    binProduct = (req, res) => {

        productModel.findById(req.query._id, function(err, data) {

            data.bin = !data.bin;
            data.save();
            res.json({
                data: data,
                success: true
            })
        }).projection({
            _id: 1,
            name: 1,
            bin: 1
        });
    }


    // !Group
    groupProductCategories = (idProduct, arrIdCategory) => {
        for (let i = 0; i < arrIdCategory.length; i++) {
            const newCateProduct = new categoryProductModel();
            newCateProduct.idProduct = idProduct;
            newCateProduct.idCategory = arrIdCategory[i];
            newCateProduct.save();
        }
    }
}

module.exports = new ProductController();