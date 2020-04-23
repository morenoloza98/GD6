
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tasks').del()
    .then(function () {
      // Inserts seed entries
      return knex('tasks').insert([
        {id: 1, description: "Do Homework", status: 'pending'},
        {id: 2, description: "Do GD6", status: 'pending'},
        {id: 3, description: "Learn React", status: 'pending'}
      ]);
    });
};
