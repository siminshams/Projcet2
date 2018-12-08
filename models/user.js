module.exports = function(sequelize, DataTypes) { 

  var User = sequelize.define("User", {    
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
      User.hasMany(models.Movie, {
          onDelete: "cascade"
      });
  };

  return User;

}