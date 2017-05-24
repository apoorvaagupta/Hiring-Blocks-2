const router = require('express').Router();
const models = require('./../../db/models').models;
const password = require('./../../utils/password');

router.post('/add', function (req, res) {
    password.pass2hash(req.body.password).then(function (hash) {
        models.Student.create({
            name: req.body.name,
            email: req.body.email,
            password: hash
        }).then(function (student) {
            res.redirect('/api/students/' + student.id);
        })
    })
});

router.get('/:id', function (req, res) {
    models.Student.findOne({
        where: {id: req.params.id}
    }).then(function (student) {
        res.send(student);
    }).catch(function (err) {
        res.send('Unknown Student');
    })
});

router.put('/:id/edit', function (req, res) {
    let studentId = parseInt(req.params.id);
    email = req.body.email;
    contact = req.body.contact;
    pincode = req.body.pincode;
    education = req.body.education;
    skills = req.body.skills;
    languages = req.body.languages;
    projects = req.body.projects;
    trainings = req.body.trainings;

    models.Student.update({
        email: email,
        contact: contact,
        pincode: pincode,
        education: education,
        skills: skills,
        languages: languages,
        projects: projects,
        trainings: trainings
    }, {
        where: {id: studentId}
    }).then(function (student) {
        res.redirect('/api/students/' + student.id);
    }).catch(function (error) {
            console.error(error)
    });
});

router.post('/:id/myApplications', function (req, res) {
    let studentId=parseInt(req.params.id);
    models.Application.findAll({
        where: {studentId: studentId},
        include: models.Job
    }).then(function (applications) {
        res.send(applications);
    }).catch(function (error) {
        console.log(error);
    })
});

router.get('/', function (req, res) {
    models.Student.findAll().then(function (students) {
        res.send(students);
    }).catch(function (error) {
        console.log(error);
    })
});

module.exports = router;