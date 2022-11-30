const Content = require('../models/content');
const Category = require('../models/category');


exports.getContents = (req, res, next) => {
    Content.findAll()
        .then(contents =>{
            res.render('admin/contents', {
                title: 'Admin Contents',
                contents: contents,
                path: '/admin/contents',
                action: req.query.action
            });
        })
        .catch((err) => {
            console.log(err)
        });
   
    
}

exports.getAddContent = (req, res, next) => {
    res.render('admin/add-content', {
        title: 'New Content',
        path: '/admin/add-content',
    });
}

exports.postAddContent = (req, res, next) => {
   

    const name = req.body.name;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;

    const content = new Content(name,imageUrl,description,null,req.user_id);
    

    content.save()
        .then(result =>{
            res.redirect('/admin/contents');
        })
        .catch(err =>{
            console.log(err);
        });
    
}


exports.getEditContent = (req, res, next) => {

    Content.findById(req.params.contentid)
        .then(content => {
            Category.findAll()
                .then(categories => {

                    categories = categories.map(category => {
                        if(content.categories){
                            content.categories.find(item => {
                                if(item == category._id) {
                                    category.selected = true;
                                }
                            })
                        }
                        
                        return category;
                    });

                    res.render('admin/edit-content', {
                        title: 'Edit Content',
                        path: '/admin/contents',
                        content: content,
                        categories: categories
                    });
                });
        })
        .catch((err) => {
            console.log(err)
        });
}

exports.postEditContent = (req, res, next) => {

    const id = req.body.id;
    const name = req.body.name;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const categories = req.body.categoryids;


    const content = new Content(name,imageUrl,description,categories,id,req.user._id)

    content.save()
        .then(content => {
            res.redirect('/admin/contents?action=edit'); 
        }).catch((err) => {
            console.log(err)
        });

}


exports.postDeleteContent = (req, res, next) => {
    const id = req.body.contentid;

    Content.deleteById(id)
        .then(() => {
            console.log('İçerik silindi')
            res.redirect('/admin/contents?action=delete');

        })
        .catch((err) => {
            console.log(err)
        });
}


exports.getAddCategory = (req, res, next) => {
    res.render('admin/add-category', {
        title: 'New Category',
        path: '/admin/add-category',
    });
}

exports.postAddCategory = (req, res, next) => {
   
    const name = req.body.name;
    const description = req.body.description;
    const category = new Category(name,description);

    category.save()
        .then(result => {
            console.log(result);
            res.redirect('/admin/categories?action=create');
        })
        .catch((err) => {
            console.log(err)
        });
}

exports.getCategories = (req, res, next) => {
   
    Category.findAll()
        .then(categories=> {
            res.render('admin/categories',{
                title: 'Categories',
                path: '/admin/categories',
                categories: categories,
                action: req.query.action
            });
        }).catch((err) => {
            console.log(err)
        });
   
}
exports.getEditCategory = (req, res, next) => {
   
    Category.findById(req.params.categoryid)
        .then(category=> {
            res.render('admin/edit-category', {
                title: 'Edit Category',
                path: '/admin/categories',
                category: category
               
            });
        }).catch((err) => {
            console.log(err)
        });
   
}

exports.postEditCategory = (req, res, next) => {
   
    const id= req.body.id;
    const name = req.body.name;
    const description = req.body.description;

    const category = new Category(name,description,id);

    category.save()
        .then(result => {
            console.log(result);
            res.redirect('/admin/categories?action=edit');
        })
        .catch((err) => {
            console.log(err)
        });
}
