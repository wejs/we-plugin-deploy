var spawn = require('child_process').spawn;

module.exports = function(data) {
  var we = data.we;

  var liveLogger = {
    current: spawn('pm2', ['logs','--lines=1'])
  }

  liveLogger.current.stdout.setEncoding('utf8')

  liveLogger.current.stdout.on('data', function (data) {
    we.io.sockets.in('deployer_logger').emit('deployer:logs:live:out', data);
  });

  liveLogger.current.stderr.on('data', function (data) {
    we.io.sockets.in('deployer_logger').emit('deployer:logs:live:error', data);
  });

  liveLogger.current.on('exit', function (code) {
    we.log.error('liveLogger exited with code: ',code, this)
    we.io.sockets.in('deployer_logger').emit('deployer:logs:live:exit', code);
  });

  we.io.sockets.on('connection', function(socket) {
    if (socket.user) {
      socket.on('deployer:subscribe:logger', function() {
        socket.join('deployer_logger');
      });

      socket.on('deployer:unsubscribe:logger', function() {
        socket.leave('deployer_logger');
      });
    }
  });
}