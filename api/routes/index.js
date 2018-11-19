const errors = require('restify-errors'),
    Task = require('../models/task');

    /** Task Routes */    
module.exports = function(db) {

    /** POST */
    db.post('/tasks', (req, res, next) => {
        if (!req.is('application/json')) {
            return next (new errors.InvalidContentError("Route requires 'application/json'"),);
        }
        let data = req.body || {};
        let task = Task.build(data);
        task.save()
            .then(task => {
                console.log('saved');
                return res.send(201, task);
            })
            .catch(error => {
                console.error(err);
                return next (new errors.InternalError(err.message));
            });
    });

    /** Get All */
    db.get('/tasks', (req, res, next) => {
        Task.findAll().then(tasks => {
            return res.send(tasks)
        });
    });

    /** Update */
   db.put('/tasks/:task_id', (req, res, next) => {
        if (!req.is('application/json')) {
            return next (new errors.InvalidContentError("Route requires 'application/json'"),);
        }
        let data = req.body || {};
        if (!data.id) {
            data.id = req.params.task_id
        }
        Task.findOne({where:{id: data.id}}).then(task => {
            if (!task) {
                return next(new errors.ResourceNotFoundError('A task with that ID could not be found'))
            }
            if (data.completed) {
                task.completed = true
            } else {
                task.completed = false
            }
            task.save(task).then((result) => {
                return res.send(200, result)
            });
        });
    });

    /** Delete */
    db.del('/tasks/:task_id', (req,res, next) => {
        Task.destroy({where:{id: req.params.task_id}}).then((result)=> {
            return res.send(204, result)
        })
    });
}
