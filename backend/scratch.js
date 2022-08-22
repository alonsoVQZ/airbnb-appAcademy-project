
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

SELECT `Spot`.`id`, `Spot`.`ownerId`, `Spot`.`address`, `Spot`.`city`, `Spot`.`state`, `Spot`.`country`, `Spot`.`lat`, `Spot`.`lng`, `Spot`.`name`, `Spot`.`description`, `Spot`.`price`, `Spot`.`createdAt`, `Spot`.`updatedAt`, COUNT(`Reviews`.`stars`) AS `numReviews`, AVG(`Reviews`.`stars`) AS `avgStarRating`, `Images`.`id` AS `Images.id`, `Images`.`url` AS `Images.url`, `Images`.`imageableId` AS `Images.imageableId`, `Owner`.`id` AS `Owner.id`, `Owner`.`firstName` AS `Owner.firstName`, `Owner`.`lastName` AS `Owner.lastName` FROM `Spots` AS `Spot` 
INNER JOIN `Images` AS `Images` ON `Spot`.`id` = `Images`.`imageableId` AND `Images`.`imageableType` = 'Spot' 
INNER JOIN `Users` AS `Owner` ON `Spot`.`ownerId` = `Owner`.`id` 
INNER JOIN `Reviews` AS `Reviews` ON `Spot`.`id` = `Reviews`.`spotId`
WHERE `Spot`.`id` = '11'
GROUP BY `Spot`.`id`, `Images.id`;