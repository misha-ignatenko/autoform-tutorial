Posts = new Mongo.Collection("posts");
Posts.attachSchema(new SimpleSchema({
    title: {
        type: String,
        label: "Title",
        max: 200
    },
    content: {
        type: String,
        label: "Content"
    },
    category: {
        type: String,
        label: "Category",

        //optional: true,

        allowedValues: ['business', 'health', 'finance'],
        autoform: {
            options: [
                {label: "Business", value: "business"},
                {label: "Health", value: "health"},
                {label: "Finance", value: "finance"}
            ]
        }
    },
    userId: {
        type: String,
        label: "Title"
    },
    tags: {
        type: [String],
        label: "Tags"
    },







    updateHistory: {
        type: [Object],
        optional: true,

        //defaultValue: [],

        autoValue: function() {
            var title = this.field("title");
            var category = this.field("category");
            var tags = this.field("tags");
            var content = this.field("content");


            console.log("title value is: ", title.value );
            console.log("category value is: ", category.value );
            console.log("tags value is: ", tags.value );
            console.log("content value is: ", content.value );


            if (title.isSet && category.isSet && tags.isSet && content.isSet) {
                if (this.isInsert) {

                    console.log("this is an insert attempt");

                    return [{
                        dateUpdated: new Date,
                        whoUpdated: Meteor.userId(),
                        title: title.value,
                        category: category.value,
                        tags: tags.value,
                        content: content.value
                    }];

                    console.log("this is end of insert attempt");

                }
                else {
                    console.log("this is a $push attempt");
                    return {
                        $push: {
                            dateUpdated: new Date,
                            whoUpdated: Meteor.userId(),
                            title: title.value,
                            category: category.value,
                            tags: tags.value,
                            content: content.value
                        }
                    };
                }
            }
            else {
                this.unset();
            }
        }

    },
    'updateHistory.$.dateUpdated': {
        type: Date,
        optional: true
    },
    'updateHistory.$.whoUpdated': {
        type: String,
        optional: true
    },
    'updateHistory.$.title': {
        type: String,
        optional: true
    },
    'updateHistory.$.category': {
        type: String,
        optional: true,
        allowedValues: ['business', 'health', 'finance']
    },
    'updateHistory.$.tags': {
        type: [String],
        optional: true
    },
    'updateHistory.$.content': {
        type: String,
        optional: true
    },



















    //datePostCreated: {
    //    type: Date,
    //    label: "Date Post Created:"
    //}



        //defaultValue: function() {
        //    var today = new Date();
        //    var day = today.getDate();
        //    var month = today.getMonth() + 1; // because January is month zero
        //    var year = today.getFullYear();
        //
        //
        //    if (day<10)
        //    {
        //        day = '0' + day;
        //    }
        //    if (month<10)
        //    {
        //        month = '0' + month;
        //    }
        //
        //
        //    var today = month + '/' + day + '/' + year;
        //
        //
        //    var dateToReturn = new Date(today);
        //    return today
        //}

        //defaultValue: new Date(2015, 1, 1)












    //
    //datePostUpdatedArray: {
    //    type: [Date]
    //},
    //userThatUpdatedPostArray: {
    //    type: [String]
    //},
    //titleUpdateHistoryArray: {
    //    type: [String],
    //    optional: true
    //},


    //numberOfEditsIncludingInitial: {
    //    type: Number,
    //    defaultValue: 1
    //},








    //commonIdForVersions: {
    //    type: String,
    //    label: "common id for versions",
    //    denyUpdate: true,
    //
    //
    //
    //    //FIX THIS
    //    //IT DOESN'T UPDATE FOR OTHER NEW ENTRIES
    //    defaultValue: Random.id()
    //},
    //dateTimeOfThisVersionUpdate: {
    //    type: Date
    //    //label: "Title"
    //}







}));



Posts.allow({

    insert: function(userId, doc){
        return doc && doc.userId === userId;
    },

    update: function(userId, doc){
        return doc && doc.userId === userId;
    }
})




