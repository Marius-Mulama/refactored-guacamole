const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    business_id: {
        type: mongoose.Schema.ObjectId, 
        ref:'Business', 
        required: true
    },
    business_name:{
        type:String,
        required:true
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
    made_by:{
        type:mongoose.Schema.ObjectId,
        ref:'Users',
        required: true,
    },
    made_on: {
        type: Date,
        default: Date.now
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