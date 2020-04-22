const knex = require('../database/connection');

exports.PENDING = 'pending';
exports.DONE = 'done';

exports.all = () => {
  return knex
    .select('*')
    .from('tasks');
}

exports.create = (task) => {
  return knex('tasks')
    .insert({ description: task.description });
}

exports.find = (id) => {
  return knex
    .select('*')
    .from('tasks')
    .where('id',id)
    .first()
}

exports.markAsDone = (task) => {
  return knex('tasks')
    .update({status: this.DONE})
    .where('id', task.id);
}

exports.deleteTask = (task) => {
  return knex('tasks')
    .del()
    .where('id', task.id);
}