class ProductController {
    getProduct = (req, res) => {
        res.render('product');
    }
}

export default new ProductController();