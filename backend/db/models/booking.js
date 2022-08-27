'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    async previewImage(booking) {
      const { Image, Sequelize } = require('../models');
        const image = await Image.findOne({
          where: { imageableType: 'Spot', imageableId: booking.spotId },
          order: ['id'],
          limit: 1
        })
        console.log(image)
        booking.dataValues.Spot.dataValues.previewImage =  'raw'
    }
    validBooking(bS, bE, rS, rE) {
      const err = new Error('Sorry, this spot is already booked for the specified dates');
      const errors = [
        'Start date conflicts with an existing booking',
        'End date conflicts with an existing booking'
      ]
      err.errors = new Array();
      if(bS <= rS && rS < bE) err.errors.push(errors[0]);
      if(bS < rE && rE <= bE) err.errors.push(errors[1]);
      if((rS <= bS && bS < rE) && err.errors.length === 0) err.errors.push(...errors)
      if(err.errors.length > 0) throw err;
      return;
    }
    static async getCurrentUserBookings(userId) {
      const { Spot, Image } = require('../models');
      const bookings = await Booking.findAll({
        where: { userId },
        include: [
          { 
            required: true,
            model: Spot,
            attributes: { 
              // include: [[sequelize.col('Image.url'), 'previewImage']],
              exclude: ['createdAt', 'updatedAt']
            },
            // include: [{ required: false, model: Image, limit: 1}]
          }
        ],
        // group: ['Spot.id'],
        order: [['id', 'ASC']]
      });
      return bookings;
    }
    static async getSpotBookings(spotId, owner) {
      const { User } = require('../models');
      if(owner) {
        const bookings = await Booking.findAll({
          where: { spotId },
          include: [
            { 
              required: true,
              model: User,
              attributes: {
                exclude: ['username', 'email', 'password', 'createdAt', 'updatedAt']
              }
            }
          ]
        });
        return bookings;
      } else {
        const bookings = await Booking.findAll({
          where: { spotId },
          attributes: {
            exclude: ['id', 'userId', 'createdAt', 'updatedAt']
          }
        });
        return bookings;
      }
    }
    static async createBooking(spotId, userId, { startDate, endDate }) {
      try {
        const { Op } = require("sequelize");
        const nowDate = new Date();
        const spotsBooked = await Booking.findAll({ 
          where: { 
            [Op.and]: [
              { spotId: spotId },
              {
                [Op.or]: [
                  { startDate: { [Op.gte]: nowDate } },
                  { endDate: { [Op.gte]: nowDate } },
                ]
              }
            ]
          } 
        });
        if(spotsBooked.length > 0) {
          spotsBooked.forEach(booking => booking.validBooking(booking.startDate, booking.endDate, startDate, endDate));
        }
        const booking = await Booking.create({ userId, spotId, startDate, endDate });
        return booking;
      } catch(e) {
        e.status = 403;
        throw e;
      }
    }
    static async editBooking(bookingId, { startDate, endDate }) {
      try {
        const { Op } = require("sequelize");
        const booking = await Booking.findByPk(bookingId);
        if(booking.startDate <= new Date()) {
          throw new Error("Past bookings can't be modified");
        }
        const nowDate = new Date();
        const spotsBooked = await Booking.findAll({ 
          where: { 
            [Op.and]: [
              { spotId: spotId },
              {
                [Op.or]: [
                  { startDate: { [Op.gte]: nowDate } },
                  { endDate: { [Op.gte]: nowDate } },
                ]
              }
            ]
          } 
        });
        if(spotsBooked.length > 0) {
          spotsBooked.forEach(booking => booking.validBooking(booking.startDate, booking.endDate, startDate, endDate));
        }
        booking.set({ startDate, endDate });
        await booking.save();
        return booking;
      } catch(e) {  
        e.status = 403;
        throw e;
      }
    }
    static async deleteBooking(bookingId) {
      try {
        const booking = await Booking.findByPk(bookingId);
        if(booking.startDate <= new Date(Date.now())) {
          throw new Error("Bookings that have been started can't be deleted");
        }
        await booking.destroy();
      } catch(e) {
        e.status = 403;
        throw e;
      }
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