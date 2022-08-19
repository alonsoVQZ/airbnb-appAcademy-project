
# User Model and Migration
npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,username:string,email:string,password:string

# Spot Model and Migration
npx sequelize-cli model:generate --name Spot --attributes ownerId:integer,address:string,city:string,state:string,country:string,lat:decimal,lng:decimal,name:string,description:string,price:integer

# Image Model and Migration
npx sequelize-cli model:generate --name Image --attributes url:string,imageableType:enum,imageableId:integer

# Review Model and Migration
npx sequelize-cli model:generate --name Review --attributes userId:integer,spotId:integer,review:string,stars:integer

# Booking Model and Migration
npx sequelize-cli model:generate --name Booking --attributes userId:integer,spotId:integer,startDate:date,endDate:date