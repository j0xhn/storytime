exports.getPagesServedByAngular = function (req, res) {
    res.render('angular/index', {
        title: 'Entry point to AngularJS pages'
    });
};
exports.feedPage = function (req, res) {
    res.render('angular/index');
}
