const database = require('../config.js');

class Olympian {
  static all() {
    return database('olympic').select(['name', 'team', 'age', 'sport', database.raw(`(case when olympic.medal is null then 0 end) as total_medals_won`)])
  };

  static youngest() {
  return database('olympic').orderBy('age').select(['name', 'team', 'age', 'sport', database.raw(`(case when olympic.medal is null then 0 end) as total_medals_won`)]).limit(1)
};

  static oldest() {
    return database('olympic').orderBy('age', 'desc').select(['name', 'team', 'age', 'sport', database.raw(`(case when olympic.medal is null then 0 end) as total_medals_won`)]).limit(1)
  };

  total_competing_olympians() {
    return database('olympic').distinct('name').select('name')
  }

  male_olympians_count() {
    return database('olympic').where('sex', 'M').avg('weight')
  }

  female_olympians_count() {
    return database('olympic').where('sex', 'F').avg('weight')
  }

  average_age() {
    return database('olympic').avg('age')
  }

  static stats() {
    let olympian = new Olympian
    return [
      olympian.total_competing_olympians().then(res => res.length),
      olympian.male_olympians_count().then(res => Number(res[0].avg)),
      olympian.female_olympians_count().then(res => Number(res[0].avg)),
      olympian.average_age().then(res => Number(res[0].avg))
    ]
  }

  static country_stats() {
    return database('olympic')
      .select('team', database.raw('ARRAY_AGG(DISTINCT sport) AS sports'))
      .groupBy('team')
      .orderBy('team');
  }
}

 module.exports = Olympian;
