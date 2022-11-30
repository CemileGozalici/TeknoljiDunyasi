const Content = require('../models/content');
const Category = require('../models/category');

exports.getIndex = (req, res, next) => {
   Content.findAll()
        .then(contents => {
            Category.findAll()
                .then(categories => {
                    res.render('detail/index', {
                        title: 'Teknoloji Dünyası',
                        contents: contents,
                        path: '/',
                        categories:categories
                    });
                })
            
        }).catch((err) => {
            console.log(err)
        });
    
}

exports.getContents = (req, res, next) => {
    
    Content.findAll()
        .then(contents => {
            Category.findAll()
                .then(categories => {
                    res.render('detail/contents', {
                        title: 'contents',
                        contents: contents,
                        path: '/contents',
                        categories:categories
                    });
                })
           
        }).catch((err) => {
            console.log(err)
        });
    
}

exports.getContentsByCategoryId = (req, res, next) => {
    const categoryid = req.params.categoryid;
    const model = [];

    Category.findAll()
        .then(categories => {
            model.categories = categories;
            return Content.findByCategoryId(categoryid);
        })
        .then(contents => {
            res.render('detail/contents', {
                title: 'Contents',
                contents: contents,
                categories: model.categories,
                selectedCategory: categoryid,
                path: '/contents'
            });
        }).catch((err) => {
            console.log(err)
        });
   
}




exports.getContent = (req, res, next) => {
   
    Content.findById(req.params.contentid)
        .then(content => {
            res.render('detail/content-detail', {
                title: content.name,
                content: content,
                path: '/contents'
            });
        }).catch((err) => {
            console.log(err)
        });
    
    
}


exports.getContentDetails = (req, res, next) => {
    res.render('detail/details', {
        title: 'Details',
        path: '/details'
    });
}


