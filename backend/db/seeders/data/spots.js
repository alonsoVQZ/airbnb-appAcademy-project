const { faker } = require('@faker-js/faker');
const  { State, City } = require('country-state-city');
const { User } = require('../../models');


module.exports = (async () => {
    const countries = [
        {
            name: 'Mexico',
            code: 'MX'
        },
        {
            name: 'United States',
            code: 'US'
        },
        {
            name: 'Canada',
            code: 'CA'
        }
    ]
    const randomCSC = () => {
        const countryObj = countries[Math.floor(Math.random() * countries.length)];
        const states = State.getStatesOfCountry(countryObj.code);
        const stateObj = states[Math.floor(Math.random() * states.length)];
        const cities = City.getCitiesOfState(countryObj.code, stateObj.isoCode);
        const cityObj = cities[Math.floor(Math.random() * cities.length)];
        return { countryObj, stateObj, cityObj }
    }
    const country = State.getStatesOfCountry('MX')
    const city = City.getCitiesOfState('MX', 'CDMX')
    
    // const spots = new Array();
    // const userCount = await User.count();
    // const randomUserId = () => Math.floor(Math.random() * ((userCount + 1) - 1) + 1),
    // for (let index = 0; index < 100; index++) {
    //     spots.push({
    //         ownerId: randomUserId(),
    //         address: faker.address.streetAddress(),
    //         city: faker.address.city(),
    //         state: faker.address.state(),
    //         country: faker.address.country(),
    //         lat: faker.address.latitude(),
    //         lng: faker.address.longitude(),
    //         name: faker.company.name(),
    //         description: `A beautiful ${faker.color.human() + " " + ['apartment', 'house', 'cabin'][Math.floor(Math.random() * 3)]} for you`,
    //         price: Math.floor(Math.random() * (1000 - 10) + 10),
    //     });
    // }
    // return spots;
})();