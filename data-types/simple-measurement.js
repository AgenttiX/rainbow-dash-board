async function create(knex, name) {
  await knex.schema.createTable(name, (table) => {
    table.increments('id');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.decimal('data');
  });
}

async function destroy(knex, name) {
  await knex.schema.dropTable(name);
}

module.exports = {
  create,
  destroy,
};
