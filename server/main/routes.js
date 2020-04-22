var express = require('express');
const taskController = require('../controllers/TaskController');
const taskModel = require('../models/Task');

var router = express.Router();

router.get('/tasks/all', taskController.listAll);
router.post('/tasks/add', taskController.store);
router.get('/tasks/:id', taskController.findOne);
router.put('/tasks/:id/done', taskController.changeStat);
router.delete('/tasks/:id/delete', taskController.delete);

module.exports = router;