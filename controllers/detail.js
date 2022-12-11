const Content = require('../models/content');
const Category = require('../models/category');

exports.getIndex = (req, res, next) => {
    //console.log(req.cookies.isAuthenticated);
    Content.find()
        .then(contents => {
            return contents;
        }).then(contents => {
            Category.find()
                .then(categories => {
                    res.render('detail/index', {
                        title: 'News',
                        contents: contents,
                        path: '/',
                        categories: categories
                    });
                })
        })
        .catch((err) => {
            console.log(err);
        });
}

exports.getContents = (req, res, next) => {
    Content
        .find()
        .then(contents => {
            return contents;
        }).then(contents => {
            Category.find()
                .then(categories => {
                    res.render('detail/contents', {
                        title: 'Contents',
                        contents: contents,
                        path: '/',
                        categories: categories
                    });
                })
        })
        .catch((err) => {
            console.log(err);
        });
}

exports.getContentsByCategoryId = (req, res, next) => {
    const categoryid = req.params.categoryid;
    const model = [];

    Category.find()
        .then(categories => {
            model.categories = categories;
            return Content.find({
                categories: categoryid
            });
        })
        .then(contents => {
            res.render('detail/contents', {
                title: 'Contents',
                contents: contents,
                categories: model.categories,
                selectedCategory: categoryid,
                path: '/contents'
            });
        })
        .catch((err) => {
            console.log(err);
        })
}

exports.getContent = (req, res, next) => {

    Content
        .findById(req.params.contentid)
        .then(content => {
            res.render('detail/content-detail', {
                title: content.name,
                content: content,
                path: '/contents'
            });
        })
        .catch((err) => {
            console.log(err);
        });
}




