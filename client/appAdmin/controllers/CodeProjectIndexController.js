App.CodeProjectIndexController = Ember.ObjectController.extend({
  breadCrumb: function(){
    return this.get('data.codeproject.name')
  }.property('data.codeproject.name'),
});