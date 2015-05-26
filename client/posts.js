/**
 * Created by mykhayloignatenko on 5/18/15.
 */
Template.posts.helpers({
    posts: function(){
        return Posts.find();
    }

})

