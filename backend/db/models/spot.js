'use strict';

const {  Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    goodDates(object) {
      const copiedObject = JSON.parse(JSON.stringify(object));
      for (const key in copiedObject) {
        
      }
    }
    static async getSpots() {
      const { Review, Image } = require('../models')
      const spots = await Spot.findAll({
        attributes: {
          include: [
            // [sequelize.fn('strftime', sequelize.col('Spot.rraw')), 'createdAt'],
            [sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgRating"]
          ]
        },
        include: [{ model: Review, attributes: [] }, { model: Image}],
        group: ['Spot.id'],
        order: ['id']
      });
      
      return spots;
    }
    static async getCurrentUserSpots(currentUserId) {
      const spots = await Spot.findAll({
        where: { ownerId: currentUserId },
        attributes: {
          include: [
            [sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgRating"]
          ]
        },
        include: [{ model: Review, attributes: [] }, { model: Image, attributes: [] }],
        group: ['Reviews.spotId'],
        order: ['id']
      });
      return spots;
    }
    static async getSpotDetails(spotId) {
      const { User, Review, Image } = require('../models')
      const spot = await Spot.findByPk(
        spotId,
        {
          attributes: {
            include: [
              [sequelize.fn("COUNT", sequelize.col("Reviews.stars")), "numReviews"],
              [sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgStarRating"]
            ]
          },
          include: [
            // { model: Image, as: 'Images', attributes: { exclude: ['imageableType', 'createdAt', 'updatedAt'] }}, 
            // { model: User, as: 'Owner', attributes: { exclude: ['username', 'email', 'password', 'createdAt', 'updatedAt'] }},
            { model: Review,  attributes: [], },
          ],
          group: ['Reviews.stars']
        }
      );
      spot.dataValues.Images = await spot.getImages();
      spot.dataValues.Owner = await spot.getOwner();

      console.log(spot.dataValues)
      return spot;
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
          imageableType: 'Spot'
        }
      });
      Spot.belongsTo(
        models.User,
          { as: 'Owner', foreignKey: 'ownerId' }
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
    // defaultScope: {
    //   attributes: {
    //     exclude: ['createdAt'],
    //     include: [[sequelize.fn('strftime', sequelize.col('Spot.createdAt')), 'createdAt']],
        
    //   }
    // },
  });
  return Spot;
};