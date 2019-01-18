
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('projects')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('projects').insert([
        {name: 'FSW Sprint', description: 'finish mvp', complete: false},
        {name: 'Yard', description: 'cut lawn', complete: false},
        {name: 'Car', description: 'change oil', complete: true}
      ]);
    });
};
