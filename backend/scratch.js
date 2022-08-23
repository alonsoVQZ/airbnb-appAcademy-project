
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

SELECT `Spot`.`id`, `Spot`.`ownerId`, `Spot`.`address`, `Spot`.`city`, `Spot`.`state`, `Spot`.`country`, `Spot`.`lat`, `Spot`.`lng`, `Spot`.`name`, `Spot`.`description`, `Spot`.`price`, `Spot`.`createdAt`, `Spot`.`updatedAt`, COUNT(`Reviews`.`stars`) AS `numReviews`, AVG(`Reviews`.`stars`) AS `avgStarRating`, `Images`.`id` AS `Images.id`, `Images`.`url` AS `Images.url`, `Images`.`imageableId` AS `Images.imageableId`
FROM `Spots` AS `Spot` 
INNER JOIN `Images` AS `Images` ON `Spot`.`id` = `Images`.`imageableId` AND `Images`.`imageableType` = 'Spot' 
LEFT JOIN `Reviews` AS `Reviews` ON `Images`.`imageableId` = `Reviews`.`spotId`
WHERE `Spot`.`id` = '11';

SELECT `Spot`.`id`, `Spot`.`ownerId`, `Spot`.`address`, `Spot`.`city`, `Spot`.`state`, `Spot`.`country`, `Spot`.`lat`, `Spot`.`lng`, `Spot`.`name`, `Spot`.`description`, `Spot`.`price`, `Spot`.`createdAt`, `Spot`.`updatedAt`, `Images`.`id` AS `Images.id`, `Images`.`url` AS `Images.url`, `Images`.`imageableId` AS `Images.imageableId`, COUNT(`Reviews`.`stars`) AS `numReviews`
FROM `Spots` AS `Spot` 
LEFT OUTER JOIN `Images` AS `Images` ON `Spot`.`id` = `Images`.`imageableId` AND `Images`.`imageableType` = 'Spot' 
LEFT OUTER JOIN `Reviews` AS `Reviews` ON `Spot`.`id` = `Reviews`.`spotId`
WHERE `Spot`.`id` = '13'
GROUP BY `Images`.`id`;

SELECT COUNT(`Reviews`.`stars`) AS `numReviews`
FROM `Spots` AS `Spot`
LEFT OUTER JOIN `Reviews` AS `Reviews` ON `Spot`.`id` = `Reviews`.`spotId`
WHERE `Spot`.`id` = '13';