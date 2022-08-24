'use strict';

const { Model } = require('sequelize');
const { User, Spot, Review, Image } = require('../models');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    static async getCurrentUserBookings(currentUserId) {
      const bookings = await Booking.findAll({
        where: { userId: currentUserId }
      });
      return bookings;
    }
    static async getSpotBookings(spotId) {
      const bookings = await Booking.findAll({
        where: { spotId }
      });
      return bookings;
    }
    static async 
    static associate(models) {
      Booking.belongsTo(
        models.User,
          { foreignKey: 'userId' }
      );
      Booking.belongsTo(
        models.Spot,
          { foreignKey: 'spotId' }
      );
    }
  }
  Booking.init({
    userId: DataTypes.INTEGER,
    spotId: DataTypes.INTEGER,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};