'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */

    queryInterface.createTable(
  'Contact',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    createdAt: {
      type: Sequelize.DATE
    },
    updatedAt: {
      type: Sequelize.DATE
    },
    subjectId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: false,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: true,
      unique: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: true,
      unique: false,
      validate: { len: { args: [0,254], msg: "Email must be max 254 characters long"} }
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: false,
      validate: { len: { args: [1,500], msg: "Description must be 1-500 characters long"} }
    }
  }
)

  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    queryInterface.dropTable('Contact')
  }
};
