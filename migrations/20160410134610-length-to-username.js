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
        'username',
        {
          type: Sequelize.STRING,
          allowNull: false,
          unique: false,
          validate: { len: { args: [3,30], msg: "Username must be at least 3-30 characters long"} }
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
        'username',
        {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
        }
      )
  }
};
