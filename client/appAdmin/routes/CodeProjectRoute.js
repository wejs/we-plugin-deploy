App.Router.map(function() {

  this.resource('codeProject', { path: '/code/project' });

});

App.Router.map(function() {
  this.resource('codeProjects', { path: '/code/project' }, function() {
    this.resource('codeProject', { path: '/:name' }, function(){


    });
  });
});

App.CodeProjectsRoute = Ember.Route.extend({
  model: function () {
    return Ember.RSVP.hash({
      data: $.ajax({
        url: '/api/v1/codeproject',
      }).done(function(data) {
        return data.codeproject;
      }),

    });
  }
});


App.CodeProjectRoute = Ember.Route.extend({
  model: function (params) {
    return Ember.RSVP.hash({
      data: $.ajax({
        url: '/api/v1/codeproject/' + params.name
      }).done(function(data) {
        return data.codeproject;
      }),

      isLoading: false,
      resultData: null,
      isRunningTask: false
    });
  },
  actions: {
    showOperations: function() {
      this.set('currentModel.isRunningTask', true);
    },
    closeOperations: function() {
      this.set('currentModel.isRunningTask', false);
    },

    getProjectLogs: function(name) {
      var self = this;

      this.set('currentModel.isLoading', true);
      this.send('showOperations');

      $.ajax({
        url: '/api/v1/codeproject/' + name + '/logs',
        method: 'GET',
      }).done(function(data) {
        self.set('currentModel.resultData', data.result);
        self.set('currentModel.isLoading', false);
      })
    },

    updateProject: function(name) {
      var self = this;

      this.set('currentModel.isLoading', true);
      this.send('showOperations');

      $.ajax({
        url: '/api/v1/codeproject/' + name + '/update',
        method: 'POST',
      }).done(function(data) {
        self.set('currentModel.resultData', data.result);
        self.set('currentModel.isLoading', false);
      })
    },

    restartProject: function(name) {
      var self = this;

      this.set('currentModel.isLoading', true);
      this.send('showOperations');

      $.ajax({
        url: '/api/v1/codeproject/' + name + '/reset',
        method: 'POST',
      }).done(function(data) {
        self.set('currentModel.resultData', data.result);
        self.set('currentModel.isLoading', false);
      })
    },

   statusProject: function(name) {
      var self = this;

      this.set('currentModel.isLoading', true);
      this.send('showOperations');

      $.ajax({
        url: '/api/v1/codeproject/' + name + '/status',
        method: 'GET',
      }).done(function(data) {
        self.set('currentModel.resultData', data.result);
        self.set('currentModel.isLoading', false);
      })
    },

    rollbackProject: function(name) {
      var self = this;

      this.set('currentModel.isLoading', true);
      this.send('showOperations');

      $.ajax({
        url: '/api/v1/codeproject/' + name + '/rollback',
        method: 'GET',
      }).done(function(data) {
        self.set('currentModel.resultData', data.result);
        self.set('currentModel.isLoading', false);
      })
    }
  }
});


