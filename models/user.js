module.exports = function(sequelize, DataTypes) { 
  var User = sequelize.define('user', {    
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
  return User;

}
