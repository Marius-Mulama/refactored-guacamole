const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    business_id: {
        type: mongoose.Schema.ObjectId, 
        ref:'Business', 
        required: true
    },
    made_by:{
        type:String,
        required: true,
        default:"Anonymous user"
    },
    review:{
        type:String,
        required: true
    },
    rating:{
        type: Number, 
        min:1, max:5,
        required: true
    },
    replied:{
        type:Boolean,
        default:false
    },
    reply:{
        type: String,
        required:false,
        default:""
    }

});


module.exports = mongoose.model('Review',reviewSchema,'Reviews');