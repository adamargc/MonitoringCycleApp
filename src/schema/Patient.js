"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PatientSchema = new Schema({
    name: {
        type: Schema.Types.String,
        required: true
    },
    patient_id: {
        type: Schema.Types.String,
        required: true
    }
});

PatientSchema.statics.create = function(obj) {
    const Patient = mongoose.model("Patient", PatientSchema);
    const patient = new Patient();
    patient.name = obj.name;
    patient.patient_id = obj.patient_id;
    return patient;
}

module.exports = mongoose.model("Patient", PatientSchema)