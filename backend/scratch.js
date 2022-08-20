
const  { State, City } = require('country-state-city');
const randomLocation = require('random-location')

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
];
const randomCSC = () => {
    const countryObj = countries[Math.floor(Math.random() * countries.length)];
    const states = State.getStatesOfCountry(countryObj.code);
    const stateObj = states[Math.floor(Math.random() * states.length)];
    const cities = City.getCitiesOfState(countryObj.code, stateObj.isoCode);
    const cityObj = cities[Math.floor(Math.random() * cities.length)];
    return { countryObj, stateObj, cityObj }
}
const csc = randomCSC()
const { latitude, longitude } = csc.cityObj;
const coords = randomLocation.randomCirclePoint({ latitude, longitude }, 500);
console.log(coords)