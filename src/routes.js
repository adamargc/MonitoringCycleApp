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
        if (typeof req.body.name == "undefined") {
            res.status(500).send({message: "You need to submit a name"})
        } else if (typeof req.body.patient_id == "undefined") {
            res.status(500).send({message: "You need to submit a patient ID"})
        } else {
            Patient.create(req.body).save()
            .then(data => {
                res.status(201).send(data)
            })
            .catch(err => {
                res.status(404).send(err)
            })
        }

    });

    module.exports = router;
