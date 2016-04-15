"use strict";

module.exports = function(sequelize, DataTypes) {
    var Category = sequelize.define("Category", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { len: { args: [3,30], msg: "Category must be 3-30 characters long"} }
    }
  }, {
        classMethods: {
            associate: function(models) {
                Category.hasMany(models.Event, {
                    foreignKey: 'categoryId',
                    onDelete: 'cascade'
                });
            }
        }
  });

  return Category;
};