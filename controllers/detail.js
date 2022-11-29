const Content = require('../models/content');
//const Category = require('../models/category');

exports.getIndex = (req, res, next) => {
   Content.findAll()
        .then(contents => {
            //console.log(contents);
            res.render('detail/index', {
                title: 'Teknoloji Dünyası',
                contents: contents,
                path: '/'
            });
        }).catch((err) => {
            console.log(err)
        });
    
}

exports.getContents = (req, res, next) => {
    
    Content.findAll()
        .then(contents => {
            res.render('detail/contents', {
                title: 'contents',
                contents: contents,
                path: '/contents'
            });
        }).catch((err) => {
            console.log(err)
        });
    
}

exports.getContentsByCategoryId = (req, res, next) => {
    const categoryid = req.params.categoryid;
    const contents = Content.getContentsByCategoryId(categoryid);
    const categories = Category.getAll();

    res.render('detail/contents', {
        title: 'Contents',
        contents: contents,
        categories: categories,
        selectedCategory: categoryid,
        path: '/contents'
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


