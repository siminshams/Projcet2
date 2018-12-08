module.exports = function(sequelize, DataTypes) { 

  var User = sequelize.define("user", {    
      username: {
          type: DataTypes.TEXT
      },
      email: {
          type: DataTypes.STRING,
          validate: {
              isEmail: true
          }
      },
      password: {
          type: DataTypes.STRING,
          allowNull: false
      }      
  });

  User.associate = function(models) {
      User.hasMany(models.movie, {
          onDelete: "cascade"
      });
  };

  return User;

}