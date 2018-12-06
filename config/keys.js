console.log("Keys loaded");
var exports = module.exports = {}

exports.TMDb = {
  api_key: process.env.TMDB_APIKEY
};

exports.NEWS = {
  api_key: process.env.NEWS_APIKEY
};
