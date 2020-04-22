const Task = require('../models/Task');

exports.store = (req, res) => {
  let task = {};
  task.description = req.body.description;
  Task.create(task).then((id) => {
    if(req.xhr || req.headers.accept.indexOf('json') > -1) {
      Task.find(id).then((task) => res.json(task));
    } else {
      res.redirect('/');
    }
  });
}

exports.delete = (req,res) => {
  let id = req.params.id;
  Task.find(id)
    .then((data) =>{
      if(req.xhr || req.headers.accept.indexOf('json') > -1){
         return res.json(), Task.deleteTask(data);
      } else {
        res.redirect('/');
      }
    });
}

exports.changeStat = (req,res) => {
  let id = req.params.id;
  Task.find(id)
    .then((data) => {
      if(req.xhr || req.headers.accept.indexOf('json') > -1){
        return res.json(), Task.markAsDone(data);
      } else {
        res.redirect('/');
      }
    });
}

exports.listAll = (req, res) => {
    Task.all()
        .then((data) => {
            res.json({ data: data });
        });
}

exports.findOne = (req,res) => {
    let id = req.params.id;
    Task.find(id)
      .then((data) => {
          return res.json({ data: data });
      });
  }