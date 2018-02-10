exports.up = knex =>
  knex.schema.createTableIfNotExists('datasets', table => {
    table.increments('id');
    table.string('name').notNullable();
    table.string('table_name').notNullable();
    table.specificType('columns', 'text[]').notNullable();
    table.timestamps(true, true);

    table.index('table_name', 'datasets_table_name_idx');
  });

exports.down = knex =>
  knex.schema.dropTableIfExists('datasets');
