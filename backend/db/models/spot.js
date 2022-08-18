'use strict';
const {  Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    static async getSpots(currentUserId) {
      let spots;
      if(currentUserId) spots = await Spot.findAll({ where: { ownerId: currentUserId } })
      else spots = await Spot.findAll();
      return spots;
    }
    static async createSpot({ currentUserId, address, city, state, country, lat, lng, name, description, price }) {
      const ownerId = currentUserId
      const spot = await Spot.create({
        ownerId: 1,
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
      Spot.belongsTo(
        models.User,
          { foreignKey: 'ownerId' }
      );
      Spot.hasMany(
        models.Image, {
        foreignKey: 'imageableId',
        constraints: false,
        scope: {
          commentableType: 'Spot'
        }
      });
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