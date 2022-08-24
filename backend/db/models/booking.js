'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    static async getCurrentUserBookings(currentUserId) {
      const { Spot, Image } = require('../models');
      const bookings = await Booking.findAll({
        where: { userId: currentUserId },
        attributes: { 
          include: []
        },
        include: [
          { 
            required: true,
            model: Spot,
            attributes: {
              include: [
                // [sequelize.col('Images.url'), 'raw']
              ]
            },
            include: [
              { 
                required: false,
                model: Image,
                limit: 1,
                order: ['id'],
                attributes: ['url']
              }
            ]
          }
        ]
      });
      return bookings;
    }
    static async createSpotBooking(spotId, userId, { startDate, endDate }) {
      const newBooking = await Booking.create({ spotId, userId, startDate, endDate });
      return await Booking.findByPk(newBooking.id);
    }
    static async editBooking(bookingId) {
      
    }
    static async deleteBooking(bookingId) {
      
    }
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