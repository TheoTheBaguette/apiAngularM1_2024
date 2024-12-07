let mongoose = require('mongoose');
let aggregatePaginate = require('mongoose-aggregate-paginate-v2');

let Schema = mongoose.Schema;

let AssignmentSchema = Schema({
    id: Number,
    dateDeRendu: Date,
    nom: String,
    rendu: Boolean,
});

// Ajout du plugin mongoose-aggregate-paginate-v2
AssignmentSchema.plugin(aggregatePaginate);

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model('Assignment', AssignmentSchema);
