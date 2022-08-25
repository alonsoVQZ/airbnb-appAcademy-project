'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    static async getCurrentUserBookings(currentUserId) {
      const { Spot, Image } = require('../models');
      const bookings = await Booking.findAll({
        where: { userId: currentUserId },
        include: [
          { required: true,
            model: Spot,
            attributes: { 
              // include: [[sequelize.col('Images.url'), 'previewImage']],
              exclude: ['createdAt', 'updatedAt']
            },
            include: [
              { 
                required: false,
                model: Image,
                order: ['id'],
                limit: 1
              }
            ]
          }
        ]
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
        const spotBooked = await Booking.findOne({ 
          where: { 
            [Op.and]: [
              { spotId: spotId },
              {
                [Op.or]: [
                  { startDate: { [Op.between]: [startDate, endDate] } },
                  { endDate: { [Op.between]: [startDate, endDate] } }
                ]
              }
            ]
          } 
        });
        if(spotBooked) {
          const startDateTimestamp = new Date(startDate);
          const endDateTimeStamp = new Date(endDate);
          const err = new Error('Sorry, this spot is already booked for the specified dates');
          err.errors = new Array();
          if(spotBooked.startDate >= startDateTimestamp && spotBooked.startDate <= endDateTimeStamp) {
            err.errors.push('Start date conflicts with an existing booking');
          }
          if(spotBooked.endDate >= startDateTimestamp && spotBooked.endDate <= endDateTimeStamp) {
            err.errors.push('End date conflicts with an existing booking');
          }
          console.log(spotBooked.startDate )
          console.log(spotBooked.endDate )
          throw err;
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
        const startDateTimestamp = new Date(startDate);
        const endDateTimeStamp = new Date(endDate);
        const booking = await Booking.findByPk(bookingId);
        if(booking.startDate <= new Date(Date.now())) {
          throw new Error("Past bookings can't be modified");
        }
        const bookingExists = await Booking.findOne({
          where: {
            [Op.and]: [
              { id: bookingId },
              { 
                [Op.or]: [{ startDate: startDateTimestamp }, { endDate: endDateTimeStamp }]
              }
            ]
          }
        })
        if(bookingExists) {
          const err = new Error('Sorry, this spot is already booked for the specified dates');
          err.errors = new Array();
          if(startDateTimestamp >= bookingExists.startDate && startDateTimestamp <= bookingExists.endDate) {
            err.errors.push('Start date conflicts with an existing booking');
          }
          if(endDateTimeStamp >= bookingExists.startDate && endDateTimeStamp <= bookingExists.endDate) {
            err.errors.push('End date conflicts with an existing booking');
          }
          throw err;
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