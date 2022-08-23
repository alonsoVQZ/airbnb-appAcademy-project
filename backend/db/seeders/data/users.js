const { faker } = require('@faker-js/faker');
const bcrypt = require('bcryptjs')

const users = new Array();

for (let i = 0; i < 20; i++) {
    const firstName = faker.name.firstName();
    users.push({
        firstName: firstName,
        lastName: faker.name.lastName(),
        username: faker.internet.userName(firstName).toLowerCase(),
        email: faker.internet.email(firstName).toLowerCase(),
        password: bcrypt.hashSync('1234')
    });
}
module.exports = users;
