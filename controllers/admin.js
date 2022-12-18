const Content = require('../models/content');
const Category = require('../models/category');

exports.getContents = (req, res, next) => {
    Content
        .find()
        .populate('userId', 'name -_id')
        .select('name imageUrl userId')
        .then(contents => {
            console.log(contents);
            res.render('admin/contents', {
                title: 'Admin Contents',
                contents: contents,
                path: '/admin/contents',
                action: req.query.action
            });
        })
        .catch((err) => {
            console.log(err);
        });
}

exports.getAddContent = (req, res, next) => {
    res.render('admin/add-content', {
        title: 'New Content',
        path: '/admin/add-content'
    });
}

exports.postAddContent = (req, res, next) => {

    const name = req.body.name;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;

    const content = new Content(
        {
            name: name,
            imageUrl: imageUrl,
            description: description,
            userId: req.user
        }
    );

    content.save()
        .then(() => {
            res.redirect('/admin/contents');
        })
        .catch(err => {
            if (err.name == 'ValidationError') {
                let message = '';
                for (field in err.errors) {
                    message += err.errors[field].message + '<br>';
                }

                res.render('admin/add-content', {
                    title: 'New Content',
                    path: '/admin/add-content',
                    errorMessage: message,
                    inputs: {
                        name: name,
                        description: description
                    }
                });
            } else {
                next(err);
            }


        });
}

exports.getEditContent = (req, res, next) => {

    Content.findById(req.params.contentid)
        //.populate('categories', 'name -_id')
        .then(content => {
            console.log(content);
            return content;
        })
        .then(content => {

            Category.find()
                .then(categories => {

                    categories = categories.map(category => {

                        if (content.categories) {
                            content.categories.find(item => {
                                if (item.toString() === category._id.toString()) {
                                    category.selected = true;
                                }
                            })
                        }

                        return category;
                    })

                    res.render('admin/edit-content', {
                        title: 'Edit Content',
                        path: '/admin/contents',
                        content: content,
                        categories: categories
                    });


                })

        })
        .catch(err => { console.log(err) });
}

exports.postEditContent = (req, res, next) => {

    const id = req.body.id;
    const name = req.body.name;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const ids = req.body.categoryids;

    Content.update({ _id: id }, {
        $set: {
            name: name,
            imageUrl: imageUrl,
            description: description,
            categories: ids
        }
    }).then(() => {
        res.redirect('/admin/contents?action=edit');
    }).catch(err => console.log(err));


}

exports.postDeleteContent = (req, res, next) => {

    const id = req.body.contentid;

    Content.findByIdAndRemove(id)
        .then(() => {
            console.log('content has been deleted.');
            res.redirect('/admin/contents?action=delete');
        })
        .catch(err => {
            console.log(err);
        });
}


exports.getAddCategory = (req, res, next) => {
    res.render('admin/add-category', {
        title: 'New Category',
        path: '/admin/add-category'
    });
}


exports.postAddCategory = (req, res, next) => {

    const name = req.body.name;
    const description = req.body.description;

    const category = new Category({
        name: name,
        description: description
    });

    category.save()
        .then(result => {
            res.redirect('/admin/categories?action=create');
        })
        .catch(err => {
            if (err.name == 'ValidationError') {
                let message = '';
                for (field in err.errors) {
                    message += err.errors[field].message + '<br>';
                }

                res.render('admin/add-category', {
                    title: 'New Category',
                    path: '/admin/add-category',
                    errorMessage: message,
                    inputs: {
                        name: name,
                        description: description
                    }
                });
            } else {
                next(err);
            }


        });
}

exports.getCategories = (req, res, next) => {

    Category.find()
        .then(categories => {
            res.render('admin/categories', {
                title: 'Categories',
                path: '/admin/categories',
                categories: categories,
                action: req.query.action
            });
        }).catch(err => console.log(err));
}


exports.getEditCategory = (req, res, next) => {
    Category.findById(req.params.categoryid)
        .then(category => {
            res.render('admin/edit-category', {
                title: 'Edit Category',
                path: '/admin/categories',
                category: category
            })
        })
        .catch(err => console.log(err));
}

exports.postEditCategory = (req, res, next) => {

    const id = req.body.id;
    const name = req.body.name;
    const description = req.body.description;

    Category.findById(id)
        .then(category => {
            category.name = name;
            category.description = description;
            return category.save();
        }).then(() => {
            res.redirect('/admin/categories?action=edit');
        })
        .catch(err => console.log(err));

}

exports.postDeleteCategory = (req, res, next) => {
    const id = req.body.categoryid;

    Category.findByIdAndRemove(id)
        .then(() => {
            res.redirect('/admin/categories?action=delete');
        })
        .catch(err => {
            console.log(err);
        })
}
