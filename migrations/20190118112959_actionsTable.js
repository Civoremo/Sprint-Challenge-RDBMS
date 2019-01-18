
exports.up = function(knex, Promise) {
    return knex.schema.createTable('actions', function(tbl) {
        tbl.increments();
        tbl.text('description').notNullable();
        tbl.text('notes');
        tbl.boolean('complete');
        tbl.integer('project_id').unsigned().references('id').inTable('projects').notNullable();
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('actions');
};
