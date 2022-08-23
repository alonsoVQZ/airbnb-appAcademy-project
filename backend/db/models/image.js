'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    static async createSpotImage(spotId, url) {
      const spotImages = await Image.count({
        where: {
          imageableId: spotId,
          imageableType: 'Spot'
        }
      });
      if(spotImages > 10) throw new Error("Maximum number of images for this resource was reached")
      const image = await Image.create({
        url,
        imageableType: 'Spot',
        imageableId: spotId
      });
      return await Image.findByPk(image.id);
    }
    static async createReviewImage(reviewId, url) {
      const reviewImages = await Image.count({
        where: {
          imageableId: reviewId,
          imageableType: 'Review'
        }
      });
      if(reviewImages > 10) throw new Error("Maximum number of images for this resource was reached")
      const image = await Image.create({
        url,
        imageableType: 'Review',
        imageableId: reviewId
      });
      return await Image.findByPk(image.id);
    }
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