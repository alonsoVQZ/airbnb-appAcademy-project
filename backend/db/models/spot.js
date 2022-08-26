'use strict';

const {  Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    static async getSpots() {
      const { Review, Image } = require('../models')
      const spots = await Spot.findAll({
        attributes: {
          include: [
            [sequelize.fn("ROUND", sequelize.fn("AVG", sequelize.col("Reviews.stars")), 1), "avgRating"],
            [sequelize.col('Images.url'), 'previewImage']
          ]
        },
        include: [
          { required: false, model: Review, attributes: [] }, 
          { required: false, model: Image, attributes: [] }
        ],
        group: ['Spot.id', 'Images.id', 'Images.url'],
        order: [['id', 'ASC'], [Image, 'id', 'ASC']]
      });
      return spots;
    }
    static async getCurrentUserSpots(currentUserId) {
      const { Review, Image } = require('../models')
      const spots = await Spot.findAll({
        where: { ownerId: currentUserId },
        attributes: {
          include: [
            [sequelize.fn("ROUND", sequelize.fn("AVG", sequelize.col("Reviews.stars")), 1), "avgRating"],
            [sequelize.col('Images.url'), 'previewImage']
          ]
        },
        include: [
          { required: false, model: Review, attributes: [] }, 
          { required: false, model: Image, attributes: [] }
        ],
        group: ['Spot.id']
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
              [sequelize.fn("ROUND", sequelize.fn("AVG", sequelize.col("Reviews.stars")), 1), "avgStarRating"]
            ]
          },
          include: [
            { required: false, model: Image, as: 'Images', attributes: { exclude: ['imageableType', 'createdAt', 'updatedAt'] } }, 
            { required: true, model: User, as: 'Owner', attributes: { exclude: ['username', 'email', 'password', 'createdAt', 'updatedAt'] }},
            { required: false, model: Review,  attributes: [], },
          ],
          group: ['Spot.id', 'Owner.id', 'Images.id', 'Images.url'],
          order: [['id', 'ASC'], [Image, 'id', 'ASC']]
        }
      );
      return spot;
    }
    static async createSpot(ownerId, { address, city, state, country, lat, lng, name, description, price }) {
      const spot = await Spot.create({ ownerId, address, city, state, country, lat, lng, name, description, price });
      return spot;
    }
    static async editSpot(spotId, { address, city, state, country, lat, lng, name, description, price } ) {
      const spot = await Spot.findByPk(spotId)
      spot.set({ address, city, state, country, lat, lng, name, description, price });
      await spot.save();
      return spot;
    }
    static async deleteSpot(spotId) {
      const spot = await Spot.findByPk(spotId);
      await spot.destroy();
    }
    static async getQuerySpots({ page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice }) {
      const { Op } = require('sequelize');
      const { Image } = require('../models');
      const filter = new Object();
      if(minLat && !maxLat) filter.lat = { [Op.gte]: minLat }
      if(maxLat && !minLat) filter.lat = { [Op.lte]: maxLat }
      if(minLat && maxLat) filter.lat = { [Op.between]: [minLat, maxLat] }
      if(minLng && !maxLng) filter.lng = { [Op.gte]: minLng }
      if(maxLng && !minLng) filter.lng = { [Op.lte]: maxLng }
      if(minLng && maxLng) filter.lng = { [Op.between]: [minLng, maxLng] }
      if(minPrice && !maxPrice) filter.price = { [Op.gte]: minPrice }
      if(maxPrice && !minPrice) filter.price = { [Op.lte]: maxPrice }
      if(minPrice && maxPrice) filter.price = { [Op.between]: [minPrice, maxPrice] }
      if(page === 0) page = 1;
      const spots = await Spot.findAll({
        where: filter,
        attributes: { 
          include: [
            [sequelize.literal(
              `(SELECT Image.url FROM Images as Image
              WHERE Image.imageableId = Spot.id AND Image.imageableType = "Spot"
              ORDER BY id ASC
              LIMIT 1)`
            ), 'previewImage']
          ] 
        },
        include: [{model: Image, attributes: []}],
        offset: (page - 1) * size,
        limit: size
      });
      return spots;
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
    price: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Spot',
    defaultScope: {
      attributes: {
        include: [
          [sequelize.fn("ROUND", sequelize.col("lat"), 7), "lat"],
          [sequelize.fn("ROUND", sequelize.col("lng"), 7), "lng"],
        ]
      }
    },
  });
  return Spot;
};