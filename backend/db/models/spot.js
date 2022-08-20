'use strict';
const {  Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    static async getSpots(currentUserId) {
      const { Image } = require('../models')
      let spots;
      if(currentUserId) spots = await Spot.findAll({ where: { ownerId: currentUserId } })
      else spots = await Spot.findAll({
        include: {
          model: Image
        }
      });
      
      return spots;
    }
    static async createSpot({ currentUserData, address, city, state, country, lat, lng, name, description, price }) {
      const ownerId = currentUserData.id;
      const spot = await Spot.create({
        ownerId,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
      });
      return spot;
    }
    static associate(models) {
      Spot.hasMany(
        models.Review,
          { foreignKey: 'spotId', onDelete: 'CASCADE',  hooks: true }
      );
      Spot.hasMany(
        models.Booking,
          { foreignKey: 'spotId', onDelete: 'CASCADE',  hooks: true }
      );
      Spot.hasMany(
        models.Image, {
        foreignKey: 'imageableId',
        constraints: false,
        scope: {
          commentableType: 'Spot'
        }
      });
      Spot.belongsTo(
        models.User,
          { foreignKey: 'ownerId' }
      );
    }
  }
  Spot.init({
    ownerId: DataTypes.INTEGER,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    lat: DataTypes.DECIMAL,
    lng: DataTypes.DECIMAL,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};