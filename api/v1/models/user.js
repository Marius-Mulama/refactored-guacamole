const mongoose = require('mongoose');

const userSChema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    phone: {type:String, 
        required:true,
        match:/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
    },
    password: {type: String, required:true},
    otp:{type: String, required:true},
    verified:{type:Boolean, default:false}

});

module.exports = mongoose.model('User',userSChema,'Users');