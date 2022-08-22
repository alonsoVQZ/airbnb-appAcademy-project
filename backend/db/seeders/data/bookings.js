const { faker } = require('@faker-js/faker');
const { User, Spot } = require('../../models');

module.exports = async () => {
    const bookings = new Array();
    const userCount = await User.count();
    const spotCount = await Spot.count();
    const randomUserId = () => Math.floor(Math.random() * ((userCount + 1) - 1) + 1);
    const randomSpotId = () => Math.floor(Math.random() * ((spotCount + 1) - 1) + 1);
    const goodUserId = (userId, ownerId) => userId !== ownerId ? userId : goodUserId(randomUserId(), ownerId);
    const randomDates = (bookings) => { 
        const startDate = faker.date.between(Date.now(), Date.now() + 31557600000);
        const endDate = faker.date.between(startDate, new Date(startDate).setMonth(startDate.getMonth() + 1));
        bookings.forEach(booking => {
            if(booking.startDate === startDate || booking.endDate === endDate) return randomDates(booking)
        })
        return { startDate, endDate }
    }
    for (let index = 0; index < 400; index++) {
        const spot = await Spot.findByPk(randomSpotId());
        const userId = goodUserId(randomUserId(), spot.ownerId)
        const spotId = spot.id;
        const dates = randomDates(bookings)
        bookings.push({
            userId,
            spotId,
            startDate: dates.startDate,
            endDate: dates.endDate
        });
        
    }
    return bookings;
}