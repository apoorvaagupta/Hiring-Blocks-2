const router = require('express').Router();
const models = require('./../../db/models').models;

router.post('/add',function (req,res) {
    models.Job.create({
        title: req.body.title,
        description: req.body.description,
        skills: req.body.skills,
        jobType: req.body.jobType,
        location: req.body.location,
        stipend: req.body.stipend,
        active: req.body.active,
        startDate: req.body.startDate,
        endDate: req.body.endDate
    }).then(function (job) {
        res.redirect('/api/job/' + job.id);
    })
});

router.get('/:id',function (req,res) {
    models.Job.findOne({
        where: {id: req.params.id}
    }).then(function (job) {
        if (!job) {
            throw err;
        }
        res.send(job);
    }).catch(function (err) {
        res.send('Unknown Job');
    })
});

router.post('/:id/apply',function (req,res) {
    models.Application.create({
        app: req.body.aapplication,
        status: none,
        studentId: req.query.studentId,
        jobId: req.params.id
    }).then(function (Application) {
        //ask where to redirect once the application is submitted
    })
});

router.get('/', function (req, res) {
    models.Job.findAll({where: {jobType: req.query.status}}).then(function (jobs) {
        res.send(jobs);
    }).catch(function (err) {
        console.log(err);
    })
});

module.exports = router;