'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    static idk() {
      return "hola"
    }
    static associate(models) {
      Image.belongsTo(
        models.Spot,
        { foreignKey: 'imageableId', constraints: false }
      );
      // Image.belongsTo(
      //   models.Review,
      //   { foreignKey: 'imageableId', constraints: false }
      // );
    }
  }
  Image.init({
    url: {
      allowNull: false,
      type: DataTypes.STRING
    },
    imageableType: {
      allowNull: false,
      type: DataTypes.ENUM('Spot', 'Review')
    },
    imageableId: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};