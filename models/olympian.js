const database = require('../config.js');

class Olympian {
  static all() {
    return database('olympic').select(['name', 'team', 'age', 'sport', database.raw(`(case when olympic.medal is null then 0 end) as total_medals_won`)])
  };
}

 module.exports = Olympian;
