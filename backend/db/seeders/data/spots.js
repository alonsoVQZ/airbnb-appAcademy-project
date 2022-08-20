const { faker } = require('@faker-js/faker');
const  { State, City } = require('country-state-city');
const randomLocation = require('random-location')
const { User } = require('../../models');


module.exports = async () => {
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
    const info = {
        names: [
            'Camp Home Away',
            'Home for Lease',
            'Bee Home',
            'Be My Guest',
            'Get Into Travel',
            'Airbnb-Friendly Space',
            'Home For You',
            'Rent Your Space',
            'Room for Rent',
            'The Guest House',
            'Unlimited Vacation',
            'Your Space for Rent',
            'Home Stay Inn',
            'Escape Vacation',
            'Air B and B Rental',
            'The Modest',
            'Top-Rent-Home',
            'Better than A Hotel',
            'Traveler’s Home',
            'Vip Host'
        ],
        descriptions: [
            'Enjoy the elegance of a by-gone era while staying in this Art Deco home. Beautifully decorated and featuring a sweeping staircase, original stained-glass windows, period furniture, and a stunningly unique black-and-white tiled bathroom.',
            'Retreat to the deck of this sustainable getaway and gaze at the twinkling constellations under a cosy tartan blanket. AirShip 2 is an iconic, insulated aluminium pod designed by Roderick James with views of the Sound of Mull from dragonfly windows. Airship002 is comfortable, quirky and cool. It does not pretend to be a five-star hotel. The reviews tell the story.',
            'Take an early morning stroll and enjoy the Trevi Fountain without the tourists. Wander around the historic streets while the city sleeps, then head back for a morning coffee at this urban-chic studio with a suspended loft bedroom.',
            'Unwind at this stunning French Provencal beachside cottage. The house was lovingly built with stone floors, high-beamed ceilings, and antique details for a luxurious yet charming feel. Enjoy the sea and mountain views from the pool and lush garden. The house is located in the enclave of Llandudno Beach, a locals-only spot with unspoilt, fine white sand and curling surfing waves. Although shops and restaurants are only a five-minute drive away, the area feels peaceful and secluded.',
            'Pretend you are lost in a magical forest as you perch on a log or curl up in the swinging chair. Soak in the tub, then fall asleep in a heavenly bedroom with cloud-painted walls and twinkling lights. And when you wake up, the espresso machine awaits.',
            'A place for you to retreat, relax, reset and revive yourself. It is a mini-retreat especially designed for You to come alone, or with a friend or partner to renew your love of life.',
            'Conveniently located to many of the area’s natural amenities, you’re literally steps from the ocean town and state park, with its many recreation opportunities. '
        ]
    }
    const randomCSC = () => {
        const countryObj = countries[Math.floor(Math.random() * countries.length)];
        const states = State.getStatesOfCountry(countryObj.code);
        const stateObj = states[Math.floor(Math.random() * states.length)];
        const cities = City.getCitiesOfState(countryObj.code, stateObj.isoCode);
        const cityObj = cities[Math.floor(Math.random() * cities.length)];
        if(!cityObj) return  randomCSC()
        return { countryObj, stateObj, cityObj }
    }
    
    const spots = new Array();
    const userCount = await User.count();
    const randomUserId = () => Math.floor(Math.random() * ((userCount + 1) - 1) + 1);
    for (let index = 0; index < 100; index++) {
        const csc = randomCSC();
        const { latitude, longitude } = csc.cityObj;
        const coords = randomLocation.randomCirclePoint({ latitude, longitude }, 500);
        spots.push({
            ownerId: randomUserId(),
            address: faker.address.streetAddress(),
            city: csc.countryObj.name,
            state: csc.stateObj.name,
            country: csc.cityObj.name,
            lat: coords.latitude,
            lng: coords.longitude,
            name: info.names[Math.floor(Math.random() * info.names.length)],
            description: info.descriptions[Math.floor(Math.random() * info.descriptions.length)],
            price: Math.floor(Math.random() * (1001 - 10) + 10),
        });
    }
    return spots;
};