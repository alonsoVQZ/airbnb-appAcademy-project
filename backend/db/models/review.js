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
      const { Review, User, Spot, Image } = require('../models');
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
      const { Review } = require('../models');
      const newReview = Review.create({
        spotId,
        userId,
        review,
        stars
      });
      return await Review.findByPK(newReview.id);
    }
    static async editReview(reviewId, { review, stars }) {
      const { Review } = require('../models');
      console.log('que peo')
      const editedReview = await Review.findByPk(reviewId);
      review.set({
        review,
        stars
      })
      await editedReview.save();
      return editedReview;
    }
    static async editReview(reviewId) {
      const review = await Review.findByPK(reviewId);
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