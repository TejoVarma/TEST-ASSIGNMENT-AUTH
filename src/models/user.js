const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    loginId : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    }
});

const userModel = new mongoose.model("users", userSchema);

module.exports = userModel;