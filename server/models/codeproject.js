/**
 * codeproject
 *
 * @module      :: Model
 *
 */

module.exports = function Model(we) {
  // set sequelize model define and options
  var model = {
    definition: {
      name : { type: we.db.Sequelize.STRING, allowNull: false, unique: true },
      description: { type: we.db.Sequelize.TEXT },
      folder: { type:  we.db.Sequelize.TEXT},
      gitRemote: { type:  we.db.Sequelize.TEXT}
    },

    associations: {},

    options: {
      classMethods: {},
      instanceMethods: {},
      hooks: {}
    }
  }

  return model;
}