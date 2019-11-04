const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const reactodo = mongoose.connection.useDb('reactodo');

var schema_todo = Schema({
    title: String,
    todo: String,
    date: String
})

module.exports = reactodo.model('Reactodo', schema_todo)