const router = require('express').Router();
const models = require('./../../db/models').models;

router.get('/', function (req, res) {
    models.Job.findAll({where: {jobType: req.query.status}}).then(function (jobs) {
        res.send(jobs);
    }).catch(function (err) {
        console.log(err);
    })
});