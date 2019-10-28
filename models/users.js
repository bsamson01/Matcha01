let mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

var def = {
    profilepic : "/images/default.png",
    img1 : "/images/default.png",
    img2 : "/images/default.png",
    img3 : "/images/default.png",
    img4 : "/images/default.png"
}

var defaultImages = JSON.stringify(def);

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
    },
    bio: {
        type: String
    },
    tagline: {
        type: String
    },
    dob : {
        type: String
    },
    addedDetails: {
        type: Boolean,
        default: false
    },
    confirmcode: {
        type: Number
    },
    verified: {
        type: Boolean,
        default: false
    },
    images: {
        type: String,
        default: defaultImages
    }
});

let Users = module.exports = mongoose.model('User', userSchema);