
exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('olympic', function(table) {
      table.increments('id').primary();
      table.string('name');
      table.string('sex');
      table.integer('age');
      table.integer('height');
      table.integer('weight');
      table.string('team');
      table.string('games');
      table.string('sport');
      table.string('event');
      table.string('medal');
    })
  ])
};

exports.down = function(knex) {
  return Promise.all([
      knex.schema.dropTable('olympic')
    ])
};
