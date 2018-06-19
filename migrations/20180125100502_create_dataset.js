exports.up = knex =>
  knex.schema.createTable('datasets', table => {
    table.increments('id');
    table.string('name').unique().notNullable();
    table.integer('table_id').unique().notNullable();
    table.string('type').notNullable();
    table.specificType('columns', 'text[]').notNullable();
    table.timestamps(true, true);
  });

exports.down = knex =>
  knex.schema.dropTable('datasets');
