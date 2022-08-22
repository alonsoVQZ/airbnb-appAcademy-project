const { faker } = require('@faker-js/faker');
const { Spot, Review } = require('../../models');

module.exports = async () => {
    const spotsCount = await Spot.count();
    const reviewsCount = await Review.count();
    const images = new Array();
    const typesArray = ['Spot', 'Review'];
    const randomSpotId = () => Math.floor(Math.random() * ((spotsCount + 1) - 1) + 1);
    const randomReviewId = () => Math.floor(Math.random() * ((reviewsCount + 1) - 1) + 1);
    const getId = (type) => type === 'Spot' ? randomSpotId() : randomReviewId();
    for (let index = 0; index < 800; index++) {
        const type = typesArray[Math.floor(Math.random() * typesArray.length)];
        images.push({
            url: faker.internet.url(),
            imageableType: type,
            imageableId: getId(type)
        })
    }
    return images;
}