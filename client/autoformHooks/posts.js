var postHooks = {
  before: {
    insert: function (doc) {
      if (Meteor.userId()) {
        doc.userId = Meteor.userId();


        //doc.dateTimeOfThisVersionUpdate = new Date();
        //doc.commonIdForVersions = Random.id();


        return doc;
      }
    }

  }
}

AutoForm.addHooks('insertPostForm', postHooks);





// now add postHooks to "updatePostForm"
var postHooksForUpdateForm = {
    before: {
        insert: function(doc) {

            //console.log(doc.userId);


            //console.log(Posts.findOne({_id: this.params._id}));


            doc.userId = Meteor.userId();



            doc.dateTimeOfThisVersionUpdate = new Date();




            //doc.commonIdForVersions = 'vfbdb';

            //doc.commonIdForVersions = Posts.findOne({  "commonIdForVersions" : "kbRgbzcBeQjrDNeL8"    })._id;


            //doc.commonIdForVersions = Posts.findOne({  "_id" : doc._id    })._id;


            //doc.commonIdForVersions = 'common id for versions should be passed here';


            return doc;
        }
    }
}
AutoForm.addHooks('updatePostForm', postHooksForUpdateForm);
