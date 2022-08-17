'use strict';
const bcrypt = require('bcryptjs');
const { Model, Validator, Op } = require('sequelize');
const toCamelCase = (string) => string[0].toUpperCase() + string.slice(1).toLowerCase();

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    toSafeObject() {
      const { id, firstName, lastName, username, email } = this;
      return { id, firstName, lastName, username, email };
    }
    validatePassword(password) {
      return bcrypt.compareSync(password, this.password.toString());
    }
    static getCurrentUserById(id) {
      return User.scope("currentUser").findByPk(id);
    }
    static async signin({ credential, password }) {
      const user = await User.scope('signinUser').findOne({
        where: {
          [Op.or]: {
            username: credential,
            email: credential
          }
        }
      });
      if (user && user.validatePassword(password)) {
        return await User.scope('currentUser').findByPk(user.id).catch(err);
      }
    }
    static async signup({ firstName, lastName, username, email, password }) {
      const user = await User.create({
        firstName,
        lastName,
        username,
        email,
        password: bcrypt.hashSync(password)
      });
      return await User.scope('currentUser').findByPk(user.id);
    }
    static associate(models) {
    }
  }
  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [2, 32],
          msg: "First Name is required"
        },
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error("Cannot be an email.");
          }
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [2, 32],
          msg: "Last Name is required"
        },
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error("Cannot be an email.");
          }
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [4, 32],
          msg: "Username is required"
        },
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error("Cannot be an email.");
          }
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8, 256],
        isEmail: {
          args: true,
          msg: "Invalid email"
        }
      }
    },
    password: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"]
      }
    },
    scopes: {
      currentUser: {
        attributes: {
          exclude: ["password", "createdAt", "updatedAt"]
        }
      },
      signinUser: {
        attributes: {}
      }
    }
  });
  return User;
};