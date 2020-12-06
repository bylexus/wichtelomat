exports.up = function (knex) {
    console.info('Run DB migration: ' + __filename);
    return knex.schema.createTable('events', function (table) {
        table.increments('id').primary();
        table.integer('user_id').notNullable().references('users.id').onUpdate('CASCADE').onDelete('CASCADE');
        table.string('title', 100);
        table.string('subtitle', 500);
        table.datetime('event_date');
        table.json('elves_entries');
        table.json('dice_results');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('modified_at').defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('users');
};
