const { faker } = require('@faker-js/faker');
const bcrypt = require('bcryptjs')

const demoUser = {
    firstName: "Demo",
    lastName: "User",
    username: "demouser",
    email: "demo@user.com",
    password: bcrypt.hashSync('1234')
}
const users = new Array();

users.push(demoUser);

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
