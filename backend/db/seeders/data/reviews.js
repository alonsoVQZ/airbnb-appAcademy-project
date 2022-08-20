const { faker } = require('@faker-js/faker');
const { User, Spot } = require('../../models');

module.exports = async () => {
    const reviewsObject = {
        1: [
            'This was a terrible stay and the host didn’t even try to help us out.',
            'Failure to accurately describe the site ruined our vacation.',
            'As I’m typing this review, no words come to mind to describe how bad this place was.'
        ],
        2: [
            'There were major issues in the site.',
            'No fan or AC in the rooms, uncomfortable beds & pillow.',
            'Place did not match the pictures in the airbnb site, is not clean'
        ],
        3: [
            'The location was fine but the site was nothing like the listing.',
            'The accommodations are modest but included everything I needed.',
            'Host was very nice, no question about that. The site is nice, but I don’t think the value is good.'
        ],
        4: [
            'This host was a generous host and made sure I had a fantastic stay in the city.',
            'The room was modest but comfortable.',
            'A cute apartment with all the necessities and a nice patio and garden.',
            'Parking is a problem but the house was lovely '
        ],
        5: [
            'This was an awesome spot!', 
            'This was a charming cottage and I loved the location!',
            'If only Airbnb supported emojis, this would be unicorn, heart, sparkle',
            'This place deserves a 15 on a scale from 1 to 10 for location!.'
        ]
    }
    const reviews = new Array();
    const userCount = await User.count();
    const spotCount = await Spot.count();
    const randomUserId = () => Math.floor(Math.random() * ((userCount + 1) - 1) + 1);
    const randomSpotId = () => Math.floor(Math.random() * ((spotCount + 1) - 1) + 1);
    const goodUserId = (userId, ownerId) => userId !== ownerId ? userId : goodUserId(randomUserId(), ownerId);
    const randomReview = (reviewsArray) => reviewsArray[Math.floor(Math.random() * reviewsArray.length)];
    for (let index = 0; index < 200; index++) {
        const spot = await Spot.findByPk(randomSpotId());
        const spotId = spot.id;
        const userId = goodUserId(randomUserId(), spot.ownerId);
        const stars = Math.floor(Math.random() * ((6) - 1) + 1);
        const review = randomReview(reviewsObject[stars])
        reviews.push({
            userId,
            spotId,
            review,
            stars
        })
    }
    return reviews;
}