const getDb = require('../utility/database').getdb;
const mongodb = require('mongodb');

class Content{
    constructor(name, imageUrl, description,categories,id,userId) {
        this.name = name;
        this.imageUrl = imageUrl;
        this.description = description;
        this.categories = (categories && !Array.isArray(categories)) ? Array.of(categories):
        categories;
        this._id= id ? new mongodb.ObjectID(id) : null;
        this.userId=userId;
    }

    save(){
        let db = getDb();

        if(this._id){
            db=db.collection('contents').updateOne({ _id: this._id },{ $set:this});
        }else{
            db=db.collection('contents').insertOne(this);
        }

        return db
            .then(result => {
               console.log(result);
            })
            .catch(err => {console.log(err)});
    }

    static findAll(){
        const db = getDb();
        return db.collection('contents')
            .find()
            //.project({name:1,imageUrl:1})
            .toArray()
            .then(contents => {
                return contents;
            }).catch(err => {
                console.log(err);
            });
    }

    static findById(contentid){
        const db = getDb();
        return db.collection('contents').
            findOne({ _id: new mongodb.ObjectID(contentid)})
            .then(content => {
                return content;
            
            }).catch(err => {
                  console.log(err);
            });
    }
    static deleteById(contentid){
        const db = getDb();
        return db.collection('contents')
                .deleteOne({ _id: new mongodb.ObjectID(contentid)})
                .then(() => {
                    console.log('deleted');
                
                }).catch(err => {
                      console.log(err);
                });
    }
    static findByCategoryId(categoryid){
        const db = getDb();
        return db.collection('contents')
            .find({categories: categoryid})
            .toArray()
            .then(contents=> {
                return contents;
            }).catch(err => {
                console.log(err);
          });

    }


}


module.exports = Content;