"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TestSchema = new Schema({
    testName: {
        type: Schema.Types.String,
        required: true
    },
    test_id: {
        type: Schema.Types.String,
        unique: true,
        required: true
    }, 
    test_table: {
        type: Schema.Types.String, 
        required: true
    }
});

TestSchema.statics.create = function(obj) {
    const Test = mongoose.model("Test", TestSchema);
    const test = new Test();
    test.testName = obj.testName;
    test.test_id = obj.test_id;
    test.test_table = obj.test_table;
    return test;
}

module.exports = mongoose.model("Test", TestSchema)