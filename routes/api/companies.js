const router = require('express').Router();
const models = require('./../../db/models').models;
const password = require('./../../utils/password');

router.post('/add', function (req, res) {
    //these details would be validated by the frontend that none of the field is empty
    // if (req.body.name === "" || req.body.email === "" || req.body.password === "") {
    //     res.send("Insufficient Details");
    // }
    password.pass2hash(req.body.password).then(function (hash) {
        models.Company.create({
            name: req.body.name,
            email: req.body.email,
            password: hash
        }).then(function (company) {
            res.redirect('/api/companies/' + company.id);
        })
    })
});

router.get('/:id', function (req, res) {
    let companyId = parseInt(req.params.id);
    models.Company.findOne({
        where: {id: companyId}
    }).then(function (company) {
        res.send(company.get()); //Ask if user or user.dataValues
    }).catch(function (err) {
        console.log(err);
        res.send('Unknown Company or unauthorized request');
    })
});

router.post('/:id/edit', function (req, res) {
    let companyId = parseInt(req.params.id);
    //     let name = req.body.name === "" ? company.name : req.body.name,
    //         email = req.body.email === "" ? company.email : req.body.email,
    //         website = req.body.website === "" ? company.website : req.body.website,
    //         locations = req.body.locations === "" ? company.locations : req.body.locations,
    //         skills = req.body.skills === "" ? company.skills : req.body.skills,
    //         repName = req.body.repName === "" ? company.repName : req.body.repName,
    //         repNumber = req.body.repNumber === "" ? company.repNumber : req.body.repNumber;
    //
    //     models.Company.update({
    //         name: req.body.name ,
    //         email: email,
    //         website: website,
    //         locations: locations,
    //         skills: skills,
    //         repName: repName,
    //         repNumber: repNumber
    //     }, {
    //         where: {id: companyId}
    //     }).then(function (company) {
    //         res.redirect('/api/companies/' + company.id);
    //     }).catch(function (err) {
    //     res.send('Unknown Company or unauthorized request');
    // });

    email = req.body.email;
    website = req.body.website;
    locations = req.body.locations;
    skills = req.body.skills;
    repName = req.body.repName;
    repNumber = req.body.repNumber;

    models.Company.update({
        email: email,
        website: website,
        locations: locations,
        skills: skills,
        repName: repName,
        repNumber: repNumber
    }, {
        where: {id: req.params.id},
        returning: true
    }).then(function (rows) {
        const company = rows[1][0].get();
        res.send(company);
    }).catch(function (error) {
        console.log(error);
    });

});

router.post('/:id/myJobs', function (req, res) {
    let companyId = parseInt(req.params.id);
    models.Job.findAll({
        where: {companyId: companyId}
    }).then(function (jobs) {
        res.send(jobs);
    }).catch(function (err) {
        console.log(err);
        res.send("Unknown company or unauthorized access");
    })
});

// Ask sir : can the company directly see all of its applications?

// router.post('/:id/myApplications', function (req, res) {
//     let companyId = parseInt(req.params.id);
//     models.Application.findAll({
//         where: {companyId: companyId},
//         include: models.Student
//     }).then(function (applications) {
//         res.send(applications);
//     }).catch(function (err) {
//         console.log(err);
//         res.send("Unknown company or unauthorized access");
//     })
// });

router.get('/', function (req, res) {
    models.Company.findAll().then(function (companies) {
        res.send(companies);
    }).catch(function (error) {
        console.log(error);
    })
});

module.exports = router;