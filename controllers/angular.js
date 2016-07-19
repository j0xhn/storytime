exports.getPagesServedByAngular = function (req, res) {
    res.render('shop/index', {
        title: 'Entry point to AngularJS pages'
    });
};
