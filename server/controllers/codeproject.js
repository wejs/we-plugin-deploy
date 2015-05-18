// api/controllers/AuthController.js

var exec = require('child_process').exec;

module.exports = {
  getProjects: function getProjects(req, res) {
    var we = req.getWe();

    var projects = [];

    for(var projectName in we.config.deploy.projects) {
      projects.push( we.config.deploy.projects[projectName] );
    }

    return res.send({
      codeproject: projects
    });
  },

  getProject: function getProject(req, res) {
    var we = req.getWe();

    var projectName = req.params.name;

    var project = we.config.deploy.projects[projectName];

    return res.send({
      codeproject: project
    });
  },

  getProjectLogs: function getProjectLogs(req, res) {
    var we = req.getWe();

    // set header to never cache this response
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');

    var projectName = req.params.name;

    var project = we.config.deploy.projects[projectName];

    var command = 'pm2 logs ' + project.pm2Name;

    exec(command, {
      timeout: 1200
    }, function(error, stdout, stderr) {
      if (error) {
        if (error.code != 143) {
          we.log.error(error, stderr);
        }
      }

      res.send({
        result: stdout,
        stderr: stderr,
        error: error
      })
    });
  },

  updateProject: function updateProject(req, res) {
    var we = req.getWe();

    var projectName = req.params.name;

    var project = we.config.deploy.projects[projectName];

    var command = 'cd ' + project.folder;

    // update code
    command += ' && git pull && npm install';
    // restart process
    command += ' && pm2 restart ' + project.pm2ConfigFile;

    exec(command, function(error, stdout, stderr) {
      if (error) we.log.error(stderr);

      res.send({
        result: stdout,
        error: error
      })
    });
  },

  resetProjectProcess: function resetProjectProcess(req, res) {
    var we = req.getWe();

    var projectName = req.params.name;

    var project = we.config.deploy.projects[projectName];

    var command = 'cd ' + project.folder;
    // restart process
    command += ' && pm2 restart ' + project.pm2ConfigFile;

    exec(command, function(error, stdout, stderr) {
      if (error) we.log.error(stderr);

      res.send({
        result: stdout,
        stderr: stderr,
        error: error
      })
    });
  },

  projectNpmOutdated: function projectNpmOutdated(req, res) {
    var we = req.getWe();

    var projectName = req.params.name;

    var project = we.config.deploy.projects[projectName];

    var command = 'cd ' + project.folder;
    // restart process
    command += ' && npm outdated;';

    exec(command, function(error, stdout, stderr) {
      if (error) we.log.error(stderr);

      res.send({
        result: stdout,
        stderr: stderr,
        error: error
      })
    });
  },


  statusProject: function statusProject(req, res) {
    var we = req.getWe();

    var projectName = req.params.name;

    var project = we.config.deploy.projects[projectName];

    var command = 'pm2 status ' + project.pm2Name;

    exec(command, function(error, stdout, stderr) {
      if (error) we.log.error(error, stderr);

      res.send({
        result: stdout,
        stderr: stderr,
        error: error
      })
    });
  },

  getAllProjectsStatus: function getAllProjectsStatus(req, res) {
    var we = req.getWe();

    var command = 'pm2 status ';

    exec(command, function(error, stdout, stderr) {
      if (error) we.log.error(stderr);

      res.send({
        result: stdout,
        stderr: stderr,
        error: error
      })
    });
  }

};