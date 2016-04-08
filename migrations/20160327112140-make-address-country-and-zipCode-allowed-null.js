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
        'Addresses',
        'country',
        {
          type: Sequelize.STRING,
          allowNull: true
        }
      ),
    queryInterface.changeColumn(
        'Addresses',
        'zipCode',
        {
          type: Sequelize.STRING,
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
      queryInterface.changeColumn(
        'Addresses',
        'country',
        {
          type: Sequelize.STRING,
          allowNull: false
        }
      ),
      queryInterface.changeColumn(
        'Addresses',
        'zipCode',
        {
          type: Sequelize.STRING,
          allowNull: false
        }
      )
  }
};
