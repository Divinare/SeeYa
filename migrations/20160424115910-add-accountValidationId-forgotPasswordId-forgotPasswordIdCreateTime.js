'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
      queryInterface.addColumn(
        'Users',
        'accountValidationId',
        {
          type:Sequelize.STRING,
          allowNull: true
        }
       ),
      queryInterface.addColumn(
        'Users',
        'forgotPasswordId',
        {
          type:Sequelize.STRING,
          allowNull: true
        }
       ),
      queryInterface.addColumn(
        'Users',
        'forgotPasswordIdCreateTime',
        {
          type:Sequelize.DATE,
          allowNull: true
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
  }
};