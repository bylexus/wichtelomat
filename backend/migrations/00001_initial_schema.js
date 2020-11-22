exports.up = function (knex) {
    console.info('Run DB migration: ' + __filename);
    return knex.schema.createTable('users', function (table) {
        table.increments('id').primary();
        table.string('email', 1024).notNullable();
        table.string('password', 256);
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.boolean('is_active').defaultTo(null);
        table.string('activation_hash', 256);
        table.timestamp('activation_started_at').defaultTo(null);
        table.unique('email');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('users');
};
