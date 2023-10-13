const mongoClient = require("mongodb").MongoClient;
const state = {
  db: null,
};
module.exports.connect = function (cb) {
  const url ="mongodb://127.0.0.1/";
  const dbname = "shopping";
  mongoClient.connect(url, (err, data) => {
    if (err) return cb(err);
    state.db = data.db(dbname);
    cb();
  });
 
};
module.exports.get = function () {
  return state.db;
};
