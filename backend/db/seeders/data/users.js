const { faker } = require('@faker-js/faker');

const users = new Array();

for (let i = 0; i < 100; i++) {
    const firstName = faker.name.firstName();
    users.push({
        firstName: firstName,
        lastName: faker.name.lastName(),
        username: faker.internet.userName(firstName),
        email: faker.internet.email(firstName),
        password: faker.internet.password(Math.floor(Math.random() * (30 - 10) + 10))
    })
}

module.exports = users;
