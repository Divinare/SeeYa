'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.createTable(
  'Attendances',
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
    attendeeName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: Sequelize.STRING,
    EventId: Sequelize.INTEGER
  }
)
  },

  down: function (queryInterface, Sequelize) {
    Sequelize.dropTable('Attendances')
  }
};
