const database = require('../config.js');

class Events {
  static all() {
    return database('olympic')
      .select('sport', database.raw('ARRAY_AGG(DISTINCT olympic.event) as events'))
      .groupBy('sport')
      .orderBy('sport')
  }
}

module.exports = Events;
