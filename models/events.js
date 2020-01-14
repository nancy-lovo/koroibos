const database = require('../config.js');

class Events {
  static all() {
    return database('olympic')
      .select('sport', database.raw('ARRAY_AGG(DISTINCT olympic.event) as events'))
      .groupBy('sport')
      .orderBy('sport')
  }

  static findMedalistsById(id) {
    return database('olympic')
      .select(
        'events.event',
        database.raw('json_agg(json_build_object(\'name\', olympic.name, \'team\', olympic.team, \'age\', olympic.age, \'medal\', olympic.medal)) as medalists')
      )
      .join('events', 'olympic.id', 'events.olympian_id')
      .where('events.event_id', id)
      .groupBy('events.event')
      .whereNot('events.medal', null)
      .first()
  }
}

module.exports = Events;
