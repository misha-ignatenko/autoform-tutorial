//hi
Tags = new Mongo.Collection("tags");
Tags.attachSchema(new SimpleSchema({

    fieldToMonitor: {
        type: Array,
        label: "field to display history for",
        optional: true,
        minCount: 1,
        maxCount: 3
    },
    'fieldToMonitor.$': {
        type: String,
        optional: true,


        //allowedValues:
        //    ['business', 'health', 'finance'],
        autoform: {
            options: [
                {label: "Title", value: "title"},
                {label: "Content", value: "content"},
                {label: "Category", value: "category"}
            ]

        }


    },
    date: {
        type: Date,
        defaultValue: new Date,
        optional: true
    }






}));



Tags.allow({

    //insert: function(userId, doc){
    //    return doc && doc.userId === userId;
    //},
    //
    //update: function(userId, doc){
    //    return doc && doc.userId === userId;
    //}

    insert: function(doc){
        return doc;
    },

    update: function(doc){
        return doc;
    }



})









