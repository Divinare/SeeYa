'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      queryInterface.addColumn(
            'Attendances',
            'comment',
            Sequelize.STRING
    )
  },

  down: function (queryInterface, Sequelize) {
        queryInterface.removeColumn('Attendances', 'comment')
  }
};
