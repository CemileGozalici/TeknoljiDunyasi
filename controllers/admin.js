const Content = require('../models/content');
//const Category = require('../models/category');


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

    const content = new Content(name,imageUrl,description);
    

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
            console.log(content);
            res.render('admin/edit-content', {
                title: 'Edit Content',
                path: '/admin/contents',
                content: content
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
    //content.categoryid = req.body.categoryid;


    const content = new Content(name,imageUrl,description,id)

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