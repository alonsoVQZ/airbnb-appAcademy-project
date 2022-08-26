
// const  { State, City } = require('country-state-city');
// const randomLocation = require('random-location')

// const countries = [
//     {
//         name: 'Mexico',
//         code: 'MX'
//     },
//     {
//         name: 'United States',
//         code: 'US'
//     },
//     {
//         name: 'Canada',
//         code: 'CA'
//     }
// ];
// const randomCSC = () => {
//     const countryObj = countries[Math.floor(Math.random() * countries.length)];
//     const states = State.getStatesOfCountry(countryObj.code);
//     const stateObj = states[Math.floor(Math.random() * states.length)];
//     const cities = City.getCitiesOfState(countryObj.code, stateObj.isoCode);
//     const cityObj = cities[Math.floor(Math.random() * cities.length)];
//     return { countryObj, stateObj, cityObj }
// }
// const csc = randomCSC()
// const { latitude, longitude } = csc.cityObj;
// const coords = randomLocation.randomCirclePoint({ latitude, longitude }, 500);

// // SELECT `Spot`.`id`, `Spot`.`ownerId`, `Spot`.`address`, `Spot`.`city`, `Spot`.`state`, `Spot`.`country`, `Spot`.`lat`, `Spot`.`lng`, `Spot`.`name`, `Spot`.`description`, `Spot`.`price`, `Spot`.`createdAt`, `Spot`.`updatedAt`, COUNT(`Reviews`.`stars`) AS `numReviews`, AVG(`Reviews`.`stars`) AS `avgStarRating`, `Images`.`id` AS `Images.id`, `Images`.`url` AS `Images.url`, `Images`.`imageableId` AS `Images.imageableId`
// // FROM `Spots` AS `Spot` 
// // INNER JOIN `Images` AS `Images` ON `Spot`.`id` = `Images`.`imageableId` AND `Images`.`imageableType` = 'Spot' 
// // LEFT JOIN `Reviews` AS `Reviews` ON `Images`.`imageableId` = `Reviews`.`spotId`
// // WHERE `Spot`.`id` = '11';

// // SELECT `Spot`.`id`, `Spot`.`ownerId`, `Spot`.`address`, `Spot`.`city`, `Spot`.`state`, `Spot`.`country`, `Spot`.`lat`, `Spot`.`lng`, `Spot`.`name`, `Spot`.`description`, `Spot`.`price`, `Spot`.`createdAt`, `Spot`.`updatedAt`, `Images`.`id` AS `Images.id`, `Images`.`url` AS `Images.url`, `Images`.`imageableId` AS `Images.imageableId`, COUNT(`Reviews`.`stars`) AS `numReviews`
// // FROM `Spots` AS `Spot` 
// // LEFT OUTER JOIN `Images` AS `Images` ON `Spot`.`id` = `Images`.`imageableId` AND `Images`.`imageableType` = 'Spot' 
// // LEFT OUTER JOIN `Reviews` AS `Reviews` ON `Spot`.`id` = `Reviews`.`spotId`
// // WHERE `Spot`.`id` = '13'
// // GROUP BY `Images`.`id`;

// // SELECT COUNT(`Reviews`.`stars`) AS `numReviews`
// // FROM `Spots` AS `Spot`
// // LEFT OUTER JOIN `Reviews` AS `Reviews` ON `Spot`.`id` = `Reviews`.`spotId`
// // WHERE `Spot`.`id` = '13';
// // imageableId = 1 AND imageableType = Spot

// // SELECT `Spot`.`id`, `Spot`.`ownerId`, `Spot`.`address`, `Spot`.`city`, `Spot`.`state`, `Spot`.`country`, `Spot`.`lat`, `Spot`.`lng`, `Spot`.`name`, `Spot`.`description`, `Spot`.`price`, `Spot`.`createdAt`, `Spot`.`updatedAt`, ROUND(`Spot`.`lat`, 7) AS `lat`, ROUND(`Spot`.`lng`, 7) AS `lng`, COUNT(`Reviews`.`stars`) AS `numReviews`, ROUND(AVG(`Reviews`.`stars`), 1) AS `avgStarRating`, `Images`.`id` AS `Images.id`, `Images`.`url` AS `Images.url`, `Images`.`imageableId` AS `Images.imageableId`, `Owner`.`id` AS `Owner.id`, `Owner`.`firstName` AS `Owner.firstName`, `Owner`.`lastName` AS `Owner.lastName` 
// // FROM `Spots` AS `Spot` 
// // INNER JOIN `Images` AS `Images` ON `Spot`.`id` = `Images`.`imageableId` AND `Images`.`imageableType` = 'Spot'
// // INNER JOIN `Users` AS `Owner` ON `Spot`.`ownerId` = `Owner`.`id`
// // INNER JOIN `Reviews` AS `Reviews` ON `Spot`.`id` = `Reviews`.`spotId`
// // GROUP BY `Images`.`id`;

// // SELECT `Spot`.`id`, `Spot`.`ownerId`, `Spot`.`address`, `Spot`.`city`, `Spot`.`state`, `Spot`.`country`, `Spot`.`lat`, `Spot`.`lng`, `Spot`.`name`, `Spot`.`description`, `Spot`.`price`, `Spot`.`createdAt`, `Spot`.`updatedAt`, ROUND(`Spot`.`lat`, 7) AS `lat`, ROUND(`Spot`.`lng`, 7) AS `lng`, ROUND(AVG(`Reviews`.`stars`), 1) AS `avgRating`, `Images`.`url` AS `previewImage` FROM `Spots` AS `Spot` RIGHT OUTER JOIN `Reviews` AS `Reviews` ON `Spot`.`id` = `Reviews`.`spotId` RIGHT OUTER JOIN `Images` AS `Images` ON `Spot`.`id` = `Images`.`imageableId` AND `Images`.`imageableType` = 'Spot' GROUP BY `Reviews`.`spotId`;

// SELECT `Booking`.`id`, `Booking`.`userId`, `Booking`.`spotId`, `Booking`.`startDate`, `Booking`.`endDate`, `Booking`.`createdAt`, `Booking`.`updatedAt`, `Spot->Images`.`url` AS `raw`, `Spot`.`id` AS `Spot.id`, `Spot`.`ownerId` AS `Spot.ownerId`, `Spot`.`address` AS `Spot.address`, `Spot`.`city` AS `Spot.city`, `Spot`.`state` AS `Spot.state`, `Spot`.`country` AS `Spot.country`, `Spot`.`lat` AS `Spot.lat`, `Spot`.`lng` AS `Spot.lng`, `Spot`.`name` AS `Spot.name`, `Spot`.`description` AS `Spot.description`, `Spot`.`price` AS `Spot.price`, `Spot`.`createdAt` AS `Spot.createdAt`, `Spot`.`updatedAt` AS `Spot.updatedAt`, `Spot->Images`.`url` AS `Spot.previewImage` 
// FROM `Bookings` AS `Booking` 
// INNER JOIN `Spots` AS `Spot` ON `Booking`.`spotId` = `Spot`.`id` 
// LEFT OUTER JOIN `Images` AS `Spot->Images` ON `Spot`.`id` = `Spot->Images`.`imageableId` AND `Spot->Images`.`imageableType` = 'Spot' WHERE `Booking`.`userId` = 9
// ORDER BY `Spot->Images`.`id` ASC
// LIMIT 1;

// SELECT `Booking`.`id`, `Booking`.`userId`, `Booking`.`spotId`, `Booking`.`startDate`, `Booking`.`endDate`, `Booking`.`createdAt`, `Booking`.`updatedAt`, `Spot`.`id` AS `Spot.id`, `Spot`.`ownerId` AS `Spot.ownerId`, `Spot`.`address` AS `Spot.address`, `Spot`.`city` AS `Spot.city`, `Spot`.`state` AS `Spot.state`, `Spot`.`country` AS `Spot.country`, `Spot`.`lat` AS `Spot.lat`, `Spot`.`lng` AS `Spot.lng`, `Spot`.`name` AS `Spot.name`, `Spot`.`description` AS `Spot.description`, `Spot`.`price` AS `Spot.price`, `Spot`.`createdAt` AS `Spot.createdAt`, `Spot`.`updatedAt` AS `Spot.updatedAt` FROM `Bookings` AS `Booking` INNER JOIN `Spots` AS `Spot` ON `Booking`.`spotId` = `Spot`.`id` WHERE `Booking`.`userId` = 9;
// Executing (default): SELECT `Image`.* FROM (SELECT * FROM (SELECT `id`, `url`, `imageableId` FROM `Images` AS `Image` WHERE (`Image`.`imageableType` = 'Spot' AND `Image`.`imageableType` = 'Spot') AND `Image`.`imageableId` = 50 ORDER BY `Image`.`id` LIMIT 1) AS sub UNION SELECT * FROM (SELECT `id`, `url`, `imageableId` FROM `Images` AS `Image` WHERE (`Image`.`imageableType` = 'Spot' AND `Image`.`imageableType` = 'Spot') AND `Image`.`imageableId` = 47 ORDER BY `Image`.`id` LIMIT 1) AS sub UNION SELECT * FROM (SELECT `id`, `url`, `imageableId` FROM `Images` AS `Image` WHERE (`Image`.`imageableType` = 'Spot' AND `Image`.`imageableType` = 'Spot') AND `Image`.`imageableId` = 33 ORDER BY `Image`.`id` LIMIT 1) AS sub UNION SELECT * FROM (SELECT `id`, `url`, `imageableId` FROM `Images` AS `Image` WHERE (`Image`.`imageableType` = 'Spot' AND `Image`.`imageableType` = 'Spot') AND `Image`.`imageableId` = 47 ORDER BY `Image`.`id` LIMIT 1) AS sub) AS `Image`;

// const date1 = new Date('2022-08-27 17:11');
// const date2 = new Date('2022-08-27 17:12');
// const date3 = new Date();
// LIMIT  = ( x results/page )
// OFFSET = ( y pages ) * ( x results/page )

// LIMIT  = ( 20 )
// OFFSET = ( 0 + 1 ) * ( 20 )

// // "@faker-js/faker": "^7.4.0",
// // "country-state-city": "^3.0.6",
// // "dotenv-cli": "^6.0.0",
// // "express-validator": "^6.14.2",
// // "nodemon": "^2.0.19",
// // "random-location": "^1.1.3",
// // "sqlite3": "^5.0.11"

// SELECT `Spot`.`id`, `Spot`.`ownerId`, `Spot`.`address`, `Spot`.`city`, `Spot`.`state`, `Spot`.`country`, `Spot`.`lat`, `Spot`.`lng`, `Spot`.`name`, `Spot`.`description`, `Spot`.`price`, `Spot`.`createdAt`, `Spot`.`updatedAt`, ROUND(`lat`, 7) AS `lat`, ROUND(`lng`, 7) AS `lng`, `Images`.`url` AS `previewImage` 
// FROM `Spots` AS `Spot`
// LEFT OUTER JOIN `Images` AS `Images` ON `Images`.`id` = (SELECT `I`.`id` FROM `Images` AS `I`
// WHERE `Spot`.`id` = `I`.`ImageableId`
// ORDER BY `I`.`id`
// LIMIT 1) AND `Images`.`imageableType` = 'Spot' 
// ORDER BY `Spot`.`id` 
// LIMIT 20
// OFFSET 20;

// "SELECT `Spot`.`id`, `Spot`.`ownerId`, `Spot`.`address`, `Spot`.`city`, `Spot`.`state`, `Spot`.`country`, `Spot`.`lat`, `Spot`.`lng`, `Spot`.`name`, `Spot`.`description`, `Spot`.`price`, `Spot`.`createdAt`, `Spot`.`updatedAt`, ROUND(`lat`, 7) AS `lat`, ROUND(`lng`, 7) AS `lng`, `Images`.`url` AS `previewImage` FROM `Spots` AS `Spot` LEFT OUTER JOIN `Images` AS `Images` ON `Images`.`id` = (SELECT `I`.`id` FROM `Images` AS `I` WHERE `Spot`.`id` = `I`.`ImageableId` ORDER BY `I`.`id` LIMIT 1) AND `Images`.`imageableType` = 'Spot' ORDER BY `Spot`.`id` LIMIT 20 OFFSET 20"

// const sequelize = require('sequelize');

// const spots = async () => {
//     const spots = await sequelize.query("SELECT `Spot`.`id`, `Spot`.`ownerId`, `Spot`.`address`, `Spot`.`city`, `Spot`.`state`, `Spot`.`country`, `Spot`.`lat`, `Spot`.`lng`, `Spot`.`name`, `Spot`.`description`, `Spot`.`price`, `Spot`.`createdAt`, `Spot`.`updatedAt`, ROUND(`lat`, 7) AS `lat`, ROUND(`lng`, 7) AS `lng`, `Images`.`url` AS `previewImage` FROM `Spots` AS `Spot` LEFT OUTER JOIN `Images` AS `Images` ON `Images`.`id` = (SELECT `I`.`id` FROM `Images` AS `I` WHERE `Spot`.`id` = `I`.`ImageableId` ORDER BY `I`.`id` LIMIT 1) AND `Images`.`imageableType` = 'Spot' ORDER BY `Spot`.`id` LIMIT 20 OFFSET 20")
//     console.log(spots)
// }
// spots()

// (SELECT I.id FROM Images AS I WHERE Spot.id = I.ImageableId ORDER BY I.id LIMIT 1)