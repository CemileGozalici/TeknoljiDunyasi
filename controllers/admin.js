const Content = require('../models/content');
const Category = require('../models/category');

exports.getContents = (req, res, next) => {
    const contents = Content.getAll();
    res.render('admin/contents', {
        title: 'Admin Contents',
        contents: contents,
        path: '/admin/contents',
        action: req.query.action
    });
}

exports.getAddContent = (req, res, next) => {
    const categories = Category.getAll();
    res.render('admin/add-content', {
        title: 'New Content',
        path: '/admin/add-content',
        categories: categories
    });
}

exports.postAddContent = (req, res, next) => {
    const content = new Content();

    content.name = req.body.name;
    content.imageUrl = req.body.imageUrl;
    content.categoryid = req.body.categoryid;
    content.description = req.body.description;

    content.saveContent();
    res.redirect('/');
}

exports.getEditContent = (req, res, next) => {

    const content = Content.getById(req.params.contentid);
    const categories = Category.getAll();

    res.render('admin/edit-content', {
        title: 'Edit Content',
        path: '/admin/contents',
        content: content,
        categories: categories
    });
}

exports.postEditContent = (req, res, next) => {

    const content = Content.getById(req.body.id);

    content.name = req.body.name;
    content.imageUrl = req.body.imageUrl;
    content.description = req.body.description;
    content.categoryid = req.body.categoryid;

    Content.Update(content);
    res.redirect('/admin/contents?action=edit');
}

exports.postDeleteContent = (req, res, next) => {
    Content.DeleteById(req.body.contentsid);
    res.redirect('/admin/contents?action=delete');
}