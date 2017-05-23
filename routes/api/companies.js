const router = require('express').Router();
const models = require('./../../db/models').models;
const password = require('./../../utils/password');

router.post('/add', function (req, res) {

    /*if (!req.user) {
     return res.send("Only logged in users can make clients")
     }
     */
    console.log(1);
    console.log(req.body.name, req.body.email, req.body.password);
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
    /*if (req.params.id == req.user.id) {
     return res.send(req.user)
     }*/
    let companyId = parseInt(req.params.id);
    models.Company.findOne({
        where: {id: companyId}
    }).then(function (company) {
        if (!company) {
            throw err;
        }
        res.send(company); //Ask if user or user.dataValues
    }).catch(function (err) {
        res.send('Unknown Company or unauthorized request');
    })
});

router.post('/edit/:id', function (req, res) {

    let companyId = parseInt(req.params.id);
    models.Company.findOne({
        where: {id: companyId}
    }).then(function (company) {
        let name = req.body.name === "" ? company.name : req.body.name,
            email = req.body.email === "" ? company.email : req.body.email,
            website = req.body.website === "" ? company.website : req.body.website,
            locations = req.body.locations === "" ? company.locations : req.body.locations,
            skills = req.body.skills === "" ? company.skills : req.body.skills,
            repName = req.body.repName === "" ? company.repName : req.body.repName,
            repNumber = req.body.repNumber === "" ? company.repNumber : req.body.repNumber;

        models.Company.update({
            name: name,
            email: email,
            website: website,
            locations: locations,
            skills: skills,
            repName: repName,
            repNumber: repNumber
        }, {
            where: {id: companyId}
        }).then(function (company) {
            res.redirect('/api/companies/' + company.id);
        }).catch(function (error) {
            console.error(error)
        });


    }).catch(function (err) {
        res.send('Unknown Company or unauthorized request');
    });

});

router.get('/', function (req, res) {
    models.Company.findAll().then(function (companies) {
        res.send(companies);
    }).catch(function (error) {
        console.log(error);
    })
});

module.exports = router;