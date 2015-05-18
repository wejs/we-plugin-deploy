/**
 * We.js plugin config
 */

module.exports = function loadPlugin(projectPath, Plugin) {
  var plugin = new Plugin(__dirname);

  // set plugin configs
  plugin.setConfigs({
    deploy: {
      // //example
      // projects: {
      //   'we-project-site': {
      //     name: 'we-project-site',
      //     description: 'We.js site project',
      //     folder: '/home/a/projetos/wejs/Site',
      //     gitRemote: 'git@github.com:wejs/website.git',
      //     pm2ConfigFile: '/home/a/projetos/pm2-configs/wejssite.json',
      //     pm2Name: 'wejssite'
      //   }
      // }
    }
  });
  // // ser plugin routes
  plugin.setRoutes({
    'get /api/v1/codeproject': {
      controller: 'codeproject',
      action: 'getProjects',
      responseType  : 'json'
    },

    'get /api/v1/codeproject/:name': {
      controller: 'codeproject',
      action: 'getProject',
      responseType  : 'json'
    },

    'get /api/v1/codeproject/:name/logs': {
      controller: 'codeproject',
      action: 'getProjectLogs',
      responseType  : 'json'
    },

    'post /api/v1/codeproject/:name/update': {
      controller: 'codeproject',
      action: 'updateProject',
      responseType  : 'json'
    },

    'post /api/v1/codeproject/:name/reset': {
      controller: 'codeproject',
      action: 'resetProjectProcess',
      responseType  : 'json'
    },

    'get /api/v1/codeproject/:name/npm/outdated': {
      controller: 'codeproject',
      action: 'projectNpmOutdated',
      responseType  : 'json'
    },

    'get /api/v1/codeproject/:name/status': {
      controller: 'codeproject',
      action: 'statusProject',
      responseType  : 'json'
    },

    'get /api/v1/codeproject-all-project-status': {
      controller: 'codeproject',
      action: 'getAllProjectsStatus',
      responseType  : 'json'
    }

  });

  plugin.events.on('we:after:load:socket.io', require('./lib/we-after-load-socket.io'));

  return plugin;
};
