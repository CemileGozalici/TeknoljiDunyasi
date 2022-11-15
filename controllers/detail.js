const Content = require('../models/content');
const Category = require('../models/category');

exports.getIndex = (req, res, next) => {
    const contents = Content.getAll();
    const categories = Category.getAll();

    res.render('detail/index', {
        title: 'Teknoloji Dünyası',
        contents: contents,
        categories: categories,
        path: '/'
    });
}

exports.getContents = (req, res, next) => {
    const contents = Content.getAll();
    const categories = Category.getAll();

    res.render('detail/contents', {
        title: 'contents',
        contents: contents,
        categories: categories,
        path: '/contents'
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
    const content = Content.getById(req.params.contentid);

    res.render('detail/content-detail', {
        title: content.name,
        content: content,
        path: '/contents'
    });
}


exports.getContentDetails = (req, res, next) => {
    res.render('detail/details', {
        title: 'Details',
        path: '/details'
    });
}


