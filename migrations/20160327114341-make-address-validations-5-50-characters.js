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
        'streetAddress',
        {
          type: Sequelize.STRING,
          allowNull: false,
          validate: { len: { args: [5,50], msg: "Address must be at least 5-50 characters long"} }
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
        'streetAddress',
        {
          type: Sequelize.STRING,
          allowNull: false,
          validate: { len: { args: [3,30], msg: "Name must be at least 5-50 characters long"} }
        }
      )
   }
};
