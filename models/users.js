let mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
const uniqueValidator = require('mongoose-unique-validator');

let userSchema = mongoose.Schema({
    firstname:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    bday: {
        type: String
    },
    gender: {
        type: String
    },
    orientation: {
        type: String
    },
    race: {
        type: String
    },
    occupation: {
        type: String
    },
    school: {
        type: String
    },
    preforientation: {
        type: String
    },
    age: {
        type: Number
    }

});

let Users = module.exports = mongoose.model('User', userSchema);