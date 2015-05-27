/**
 * Created by mykhayloignatenko on 5/26/15.
 */
Template.post.helpers({
    updateContentHistory: function() {
        var _post = Posts.findOne({_id: this._id});
        return _post && _post.updateHistory;
    },





});