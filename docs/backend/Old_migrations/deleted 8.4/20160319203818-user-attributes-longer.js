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
        'password',
        {
          type: Sequelize.STRING(260)
        }
      ),
      queryInterface.changeColumn(
        'Users',
        'salt',
        {
          type: Sequelize.STRING(260)
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
        'password',
        {
          type: Sequelize.STRING(255)
        }
      ),
      queryInterface.changeColumn(
        'Users',
        'salt',
        {
          type: Sequelize.STRING(255)
        }
      )
  }
};
