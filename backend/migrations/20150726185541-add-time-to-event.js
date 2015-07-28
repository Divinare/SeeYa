'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

    return [
    queryInterface.addColumn(
      'Events',
      'time',
      {
        type:Sequelize.TIME,
        allowNull: false,
        defaultValue: 0
      }
      )
    ];
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: function (queryInterface, Sequelize) {
    return [
      queryInterface.removeColumn('Events', 'time')
    ];
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};