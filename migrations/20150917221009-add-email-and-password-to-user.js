'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        queryInterface.addColumn(
            'Users',
            'password',
            {
                type: Sequelize.STRING,
                allowNull: false
            }
        ),
        queryInterface.addColumn(
            'Users',
            'email',
            {
                type: Sequelize.STRING,
                allowNull: false,
                unique:true
            }
        )
    },

    down: function (queryInterface, Sequelize) {
        queryInterface.removeColumn('users', 'password'),
        queryInterface.removeColumn('users', 'email')
    }
};
