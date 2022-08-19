const { faker } = require('@faker-js/faker');
const { User } = require('../../models');

module.exports = async () => {
    const qty = await User.count();
    const spots = new Array();
    for (let index = 0; index < 100; index++) {
        spots.push({
            ownerId: Math.floor(Math.random() * ((qty + 1) - 1) + 1),
            address: faker.address.streetAddress(),
            city: faker.address.city(),
            state: faker.address.state(),
            country: faker.address.country(),
            lat: faker.address.latitude(),
            lng: faker.address.longitude(),
            name: faker.company.name(),
            description: `A beautiful ${faker.color.human() + " " + ['apartment', 'house', 'cabin'][Math.floor(Math.random() * 3)]} for you`,
            price: Math.floor(Math.random() * (1000 - 10) + 10),
        });
    }
    return spots;
};