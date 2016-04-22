'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
      queryInterface.changeColumn(
        'Users',
        'email',
        {
          type: Sequelize.STRING,
          allowNull: true,
          unique: true
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
    queryInterface.changeColumn(
        'Users',
        'email',
        {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
        }
      )
  }
};
