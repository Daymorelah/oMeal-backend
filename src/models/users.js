import bcrypt from 'bcrypt'

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: {
          args: [5, 32],
          msg: 'username must be more than 5 characters'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [8, 32],
          msg: "password length is not in range '8-32'"
        }
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    tableName: 'users',
    hooks: {
      /**
       * Hash user's password
       * @method
       * @param {Object} user sequelize model instance
       * @returns {void} no return
       */
      beforeCreate(user) {
        user.hashPassword()
      }
    }
  })
  User.associate = models => {
    User.hasMany(models.Menu, {
      foreignKey: 'userId',
      as: 'menus',
    });
    User.hasMany(models.Order, {
      foreignKey: 'userId',
      as: 'orders',
    });
  }
  /* eslint-disable func-names */
  /**
   * Compare plain password to user's hashed password
   * @method
   * @param {String} password
   * @returns {Boolean} password match
   */
  User.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password)
  }

  /**
   * Hash user's password
   * @method
   * @returns {void} no return
   */
  User.prototype.hashPassword = function () {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8))
  }

  return User
}
