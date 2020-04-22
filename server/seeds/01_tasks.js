
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tasks').del()
    .then(function () {
      // Inserts seed entries
      return knex('tasks').insert([
        {description: "Do Homework", status: 'pending'},
        {description: "Do GD6", status: 'pending'},
        {description: "Learn React", status: 'pending'}
      ]);
    });
};
