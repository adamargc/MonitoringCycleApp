"use strict";

const Patient = require("./schema/Patient");
const Test = require("./schema/Tests");
const express = require("express");
const router = express.Router();

router.route("/")
    .get((_req, res) => {
        console.log("GET /");
        res.status(200).send({
            data: "The Patient Monitoring Cycle App is Active and Running"
        });
    });

router.route("/tests")
.get((req, res) => {
    console.log("GET /tests");
    Test.find({})
        
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send(err);
        });
})
.post((req, res) => {
    console.log("POST /tests");
    if (typeof req.body.testName == "undefined") {
        res.status(500).send({message: "You need to submit a testName"})
    } else if (typeof req.body.test_id == "undefined") {
        res.status(500).send({message: "You need to submit a test ID"})
    } else if (typeof req.body.test_table == "undefined") {
        res.status(500).send({message: "You need to submit a test table"})
    }
    
    
    else {
        Test.create(req.body).save()
        .then(data => {
            res.status(201).send(data)
        })
        .catch(err => {
            res.status(404).send(err)
        })
    }

});

router.route("/patients")
    .get((req, res) => {
        console.log("GET /patients");
        Patient.find({})
            .sort('patient_id')
            .then(data => {
                
                if (data == undefined) {
                    res.status(404).send({message: "There is no patient with this Patient ID"})
                } else {
                    res.status(200).send(data);
                }
                
            })
            .catch(err => {
                res.status(500).send(err);
            });
    })
    .post((req, res) => {
        console.log("POST /patients");
        if (typeof req.body.firstName == "undefined") {
            res.status(500).send({message: "You need to submit a firstName"})
        } else if (typeof req.body.patient_id == "undefined") {
            res.status(500).send({message: "You need to submit a patient ID"})
        } else if (typeof req.body.lastName == "undefined") {
            res.status(500).send({message: "You need to submit a lastName"})
        }
        
        
        else {
            console.log(req.body)
            Patient.create(req.body).save()
            .then(data => {
                res.status(201).send(data)
            })
            .catch(err => {
                res.status(404).send(err)
            })
        }

    });

    router.route("/patients/:id")
    .get((req, res) => {
        console.log(`GET /patients/${req.params.id}`);
        
        Patient.findOne({patient_id: req.params.id})
            
            .then(data => {
                if (data == null) {
                    res.status(404).send({message: "There is no Patient with this Patient ID"})

                } else {
                    res.status(200).send(data);
                }
                
            })
            .catch(err => {
                res.status(500).send(err);
            });
    })
    .patch((req, res) => {
        console.log(`PATCH /patients/${req.params.id}`);

        let params = { "firstName": req.body.firstName, "patient_id": req.body.patient_id, "lastName": req.body.lastName, "testsRequested": req.body.testsRequested, "testsCompleted": req.body.testsCompleted }

        for (let prop in params) if(!params[prop]) delete params[prop];


        Patient.findOneAndUpdate({patient_id: req.params.id}, params)
            .then(patient => {
                if (patient == null) {
                    res.status(404).send({message: "Cannot find a patient with this ID"})
                } else {
                    Patient.findOne({patient_id: req.params.id})
                        .then(newPatient => {
                            res.status(200).send(newPatient)
                        })
                }
            })
            .catch(err => {
                res.status(404).send({message: "Cannot find a patient with this ID"})
            })
    });


    module.exports = router;
