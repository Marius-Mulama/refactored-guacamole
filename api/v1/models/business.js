const mongoose = require("mongoose");

const review = require("./review")

const businessSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    contact: String,
    location: {
        type: { type: String },
        coordinates: [],
        required:false
    },
    industry:{
        type:String,
        required:false,
        default:""

    },
    reviews:[review.modelName]
    
});


module.exports = mongoose.model('Business',businessSchema,'Business');