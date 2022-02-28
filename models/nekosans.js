'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Nekosan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Nekosan.belongsTo(models.User,{
        foreignKey:'user_id',
        as        :'users'
      })
    }
  };
  Nekosan.init({
    name: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    age: DataTypes.STRING,
    food: DataTypes.STRING,
    personality: DataTypes.STRING,
    favoriteToys: DataTypes.STRING,
    favoriteSnack: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Nekosan',
    tableName: 'nekosan'
  });
  return Nekosan;
};