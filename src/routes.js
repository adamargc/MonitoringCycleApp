"use strict";

const Patient = require("./schema/Patient");
const express = require("express");
const router = express.Router();

router.route("/")
    .get((_req, res) => {
        console.log("GET /");
        res.status(200).send({
            data: "The Patient Monitoring Cycle App is Active and Running"
        });
    });

router.route("/patients")
    .get((req, res) => {
        console.log("GET /patients");
        Patient.find({})
            .sort('patient_id')
            .then(data => {
                res.status(200).send(data);
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
                res.status(200).send(data);
            })
            .catch(err => {
                res.status(500).send(err);
            });
    });

    module.exports = router;
