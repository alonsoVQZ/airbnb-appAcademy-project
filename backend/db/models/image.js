'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    static associate(models) {
      Image.belongsTo(
        models.Spot,
        { 
          through: 'SpotImages',
          as: 'Images',
          foreignKey: 'imageableId', 
          constraints: false 
        }
      );
      Image.belongsTo(
        models.Review,
        { 
          through: 'ReviewImages',
          as: 'Imagess',
          foreignKey: 'imageableId', 
          constraints: false 
        }
      );
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
    defaultScope: {
      attributes: {
        exclude: ['imageableType', 'createdAt', 'updatedAt']
      }
    }
  });
  return Image;
};