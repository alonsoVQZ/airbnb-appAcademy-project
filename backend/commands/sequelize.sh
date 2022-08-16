# npx sequelize-cli init

npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,username:string,email:string,password:string

npx dotenv sequelize-cli db:migrate --name 20220816035122-create-user.js

npx sequelize-cli seed:generate --name users

npx dotenv sequelize-cli db:seed --name 20220816040215-users.js

npx dotenv sequelize-cli db:seed:all