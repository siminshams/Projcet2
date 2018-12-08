module.exports = function(sequelize, DataTypes) {

  var Movie = sequelize.define("movie", {
    movieId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    watched: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  Movie.associate = function(models) {
    Movie.belongsTo(models.user, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Movie;

}