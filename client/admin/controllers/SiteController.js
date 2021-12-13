class SiteController {
    getHome = (req, res) => {
        res.render('site/home');
    }
}
export default new SiteController();