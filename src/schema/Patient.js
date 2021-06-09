"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PatientSchema = new Schema({
    firstName: {
        type: Schema.Types.String,
        required: true
    },
    patient_id: {
        type: Schema.Types.String,
        unique: true,
        required: true
    },

    lastName: {
        type: Schema.Types.String,
        required: true
    }, 

    testsRequested: {
        type: Schema.Types.Array,
        required: true
    }, 

    testsCompleted: {
        type: Schema.Types.Array,
        required: true
    }
});

PatientSchema.statics.create = function(obj) {
    const Patient = mongoose.model("Patient", PatientSchema);
    const patient = new Patient();
    patient.firstName = obj.firstName;
    patient.patient_id = obj.patient_id;
    patient.lastName = obj.lastName;
    return patient;
}

module.exports = mongoose.model("Patient", PatientSchema)