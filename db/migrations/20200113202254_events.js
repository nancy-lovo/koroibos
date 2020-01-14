
exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('events', function(table) {
      table.increments('id').primary();
      table.string('event');
      table.string('event_id');
      table.string('medal');
      table.integer('olympian_id').references('id').inTable('events').notNull().onDelete('cascade');
    })
  ])
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable('olympic')
  ])
};
