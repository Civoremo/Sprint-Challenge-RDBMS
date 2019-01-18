
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('actions')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('actions').insert([
        {description: "install dependencies", notes: "some note", complete: true, project_id: 1},
        {description: "migration", notes: "some other note", complete: false, project_id: 1},
        {description: "rake", notes: "some note", complete: false, project_id: 2},
        {description: "edge", notes: "some note", complete: false, project_id: 2},
        {description: "change oil", notes: "some note", complete: true, project_id: 3},
        {description: "change oil filter", notes: "some note", complete: false, project_id: 3},
        {description: "clean up", notes: "some note", complete: false, project_id: 3}
      ]);
    });
};
