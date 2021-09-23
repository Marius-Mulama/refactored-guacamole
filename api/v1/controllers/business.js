const mongoose = require('mongoose');

const Business = require('../models/business');

exports.create_business = (req,res,next)=>{
    if (Object.keys(req.body).length === 0) {
        return res.status(500).json({
            error:"Empty POST request"
        });
     }else{

        const business = new Business({
            _id: new mongoose.Types.ObjectId(),
            name:req.body.name,
            contact:req.body.contact,
            industry:req.body.industry
        });
    
        business.save()
        .then( result =>{
            res.status(201).json({
                message: 'Created Successfully',
                createbusiness: {
                    id:result._id,
                    name: result.name,
                    contact: result.contact,
                    location: result.location,
                    reviews: result.reviews
                    
                }
            });
    
        }).catch(err => {
            console.log(44);
            console.log(err);
            res.status(500).json({
                error:err
            });
        });

     }

}

exports.show_all = (req,res,next)=>{
    Business.find()
    .select('name _id')
    .exec()
    .then(result =>{
        //console.log(result);
        const response ={
            count: result.length,
            Business: result

        }
        res.status(200).json(response);
    })
    .catch(err =>{
        //console.log(err);
        res.status(500).json({
            message:err
        });
    });

}