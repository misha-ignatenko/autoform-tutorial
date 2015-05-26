(function () {

  'use strict';

  Meteor.methods({
    'reset' : function() {
      // you can do some resetting of your app here
      // fixture code will only execute inside mirrors neither runs
      // inside the main app nor gets bundled to production.


      Posts.remove({});
      //users.remove({});

    },
    'user' : function(userId) {
        return Meteor.userId();
    }



    //,
    //
    //'commonIdForVersions' : function(commonIdForVersions) {
    //  return Posts.find({  });


   // }


  });

})();