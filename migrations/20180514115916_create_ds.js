const dataTypes = require('../data-types');

exports.up = knex =>
  knex.schema.raw('CREATE SEQUENCE ds_serial START 1');

exports.down = async (knex) => {
  const rows = await knex('datasets').select('table_id', 'type');

  for (const row of rows) {
    const dataType = dataTypes.getType(row.type);
    await dataType.destroy(knex, `ds_${row.table_id}`);
  }

  return knex.schema.raw('DROP SEQUENCE ds_serial');
};
