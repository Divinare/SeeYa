'use strict';

/*module.exports = {
 up: function (queryInterface, Sequelize) {

  return [
  queryInterface.removeColumn(
    'Events',
    'time'
    ),
  queryInterface.removeColumn(
    'Events',
    'date'
    ),
  queryInterface.addColumn(
    'Events',
    'timestamp',
    {
      type:Sequelize.BIGINT
    }
    )

  ];*/
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
      */
/*    },

    down: function (queryInterface, Sequelize) {
      return [
      queryInterface.removeColumn('Events', 'timestamp'),

      queryInterface.addColumn(
        'Events',
        'time',
        {
          type:Sequelize.TIME,
          allowNull: false
        }
        ),

        queryInterface.addColumn(
        'Events',
        'date',
        {
          type: DataTypes.DATE,
          allowNull: false
        }
        )


      
      ];
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
      */
 /*   }
  };
*/