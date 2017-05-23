const router = require('express').Router();
const models = require('./../../db/models').models;
const password = require('./../../utils/password');

router.post('/add',function (req,res) {
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

router.get('/:id',function (req,res) {
    models.Student.findOne({
        where: {id: req.params.id}
    }).then(function (student) {
        if (!student) {
            throw err;
        }
        res.send(student);
    }).catch(function (err) {
        res.send('Unknown Student');
    })
});

router.put('/:id/edit',function (req,res) {
    models.Company.findOne({
        where: {id: req.params.id}
    }).then(function (student) {
        let firstname = req.body.firstname === "" ? student.firstname : req.body.firstname,
            lastname = req.body.lastname === "" ? student.lastname : req.body.lastname,
            email = req.body.email === "" ? student.email : req.body.email,
            contact = req.body.contact === "" ? student.contact : req.body.contact,
            pincode = req.body.pincode === "" ? student.pincode : req.body.pincode,
            education = req.body.education === "" ? student.education : req.body.education,
            skills = req.body.skills === "" ? company.skills : req.body.skills,
            languages = req.body.languages === "" ? company.languages : req.body.languages,
            projects = req.body.projects === "" ? company.projects : req.body.projects,
            trainings = req.body.trainings === "" ? student.trainings : req.body.trainings;

        models.Student.update({
            firstname: firstname,
            lastname: lastname,
            email: email,
            contact: contact,
            pincode: pincode,
            education: education,
            skills: skills,
            languages: languages,
            projects: projects,
            trainings: trainings
        }, {
            where: {id: req.params.id}
        }).then(function (student) {
            res.redirect('/api/students/' + student.id);
        }).catch(function (error) {
            console.error(error)
        });


    }).catch(function (err) {
        res.send('Unknown Student');
    });

});

router.post('/:id/myApplications',function (req,res) {
    models.Application.find({
        where: {studentId: req.params.id},
        include: models.Job
    }).then(function (applications) {
        res.send(applications);
    }).catch(function (error) {
        console.log(error);
    })
});

router.get('/',function (req,res) {
   models.Student.findAll().then(function (students) {
       res.send(students);
   }).catch(function (error) {
       console.log(error);
   })
});

module.exports = router;