App.DeployerLiveLoggerComponent = Ember.Component.extend({
  init: function() {
    this._super();
    App.socket.on('deployer:logs:live:out', function(data) {
      console.log('Deployer:logs:live:out >> ', data);
    });

    App.socket.on('deployer:logs:live:error', function(data) {
      console.error('Deployer:logs:live:error >> ', data);
    });

  },

  didInsertElement: function() {
    App.socket.emit('deployer:subscribe:logger');
  },
  willDestroyElement: function() {
    App.socket.emit('deployer:subscribe:logger');
  }
});