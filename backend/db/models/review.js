'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static async getCurrentUserReviews(currentUserId) {
      const { Review, User, Spot, Image } = require('../models');
      const reviews = await Review.findAll({
        where: { userId: currentUserId },
        include: [
          { required: true, model: User, attributes: { exclude: ['username', 'email', 'password', 'createdAt', 'updatedAt'] }},
          { required: true, model: Spot, attributes: { exclude: ['createdAt', 'updatedAt'] }},
          { required: false, model: Image, attributes: { exclude: ['imageableType', 'createdAt', 'updatedAt'] }},
        ]
      });
      return reviews;
    }
    static async getSpotReviews(spotId) {
      const {  User, Image } = require('../models');
      const reviews = await Review.findAll({
        where: { spotId },
        include: [
          { required: true, model: User, attributes: { exclude: ['username', 'email', 'password', 'createdAt', 'updatedAt'] }},
          { required: false, model: Image, attributes: { exclude: ['imageableType', 'createdAt', 'updatedAt'] }},
        ]
      });
      return reviews;
    }
    static async createReview(spotId, userId, { review, stars }) {
      try {
        console.log(spotId, userId)
        const { Op } = require('sequelize');
        const { Review } = require('../models');
        const reviewCheck = await Review.findOne({ where: { [Op.and]: [{ spotId }, { userId }] } });
        if(reviewCheck) throw new Error('User already has a review for this spot');
        const newReview = Review.create({ spotId, userId, review, stars }); 
        return newReview;
      } catch(e) {
        e.status = 403;
        throw e;
      }
    }
    static async editReview(reviewId, { review, stars }) {
      const editedReview = await Review.findByPk(reviewId);
      editedReview.set({
        review,
        stars
      })
      await editedReview.save();
      return editedReview;
    }
    static async deleteReview(reviewId) {
      const review = await Review.findByPk(reviewId);
      await review.destroy();
    }
    static associate(models) {
      Review.hasMany(
        models.Image, {
        foreignKey: 'imageableId',
        constraints: false,
        scope: {
          imageableType: 'Review'
        }
      });
      Review.belongsTo(
        models.User,
          { foreignKey: 'userId' }
      );
      Review.belongsTo(
        models.Spot,
          { 
            through: 'SpotReviews',
            foreignKey: 'spotId' 
          }
      );
    }
  }
  Review.init({
    userId: DataTypes.INTEGER,
    spotId: DataTypes.INTEGER,
    review: DataTypes.STRING,
    stars: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};