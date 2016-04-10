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
        'Attendances',
        'userId',
        {
          type:Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 3,
          references: {model: 'Users', key: 'id'}
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
    queryInterface.removeColumn('Attendances', 'userId')
  }
};
