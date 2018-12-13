module.exports = function(sequelize, DataTypes) {

  var Movie = sequelize.define("movie", {
    movieId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    year: {
      type: DataTypes.STRING
    },
    overview: {
      type: DataTypes.TEXT
    },
    poster: {
      type: DataTypes.STRING
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