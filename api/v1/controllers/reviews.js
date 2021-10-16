const mongoose = require("mongoose");

//models import
const Review = require("../models/review");
const Business = require("../models/business");
const review = require("../models/review");

exports.reviews_get_all = (req,res,next)=>{
    if(res.locals.user) {
        //console.log(res.locals.user);
        const userId = res.locals.user;
    }

    res.status(200).json({message:"reviews get"});
}


exports.get_individual_review = (req,res,next)=>{

    res.status(200).json({message:"All reviews made"});
}

exports.make_review = (req,res,next)=>{

    //Incoming json Structure

    // {
    //     business:"business id"
    //     review:"",
    //     rating:"",
    //     reviewer:"user id"


    // }


    const id = req.params.businessId;
    //console.log(1);

    Business.findById(id)
    .then(business =>{
        if(!business){
            return res.status(404).json({
                message:"Business not found"
            });
        }

        //console.log(1);


        const review = new Review({
            _id:mongoose.Types.ObjectId(),
            review: req.body.review,
            rating: req.body.rating,
            business_id: id
        });

    
        review.save()
        .then(result =>{
            res.status(200).json({
                message:"Review was made",
                review: result
            });
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({error: "review Not Made"});
        });


    })
    .catch(err =>{
        res.status(500).json({
            message: 'Business not found',
            error:err
        });
    });

    


    //res.status(200).json({message:"Make review"});
}

exports.get_reviews = (req,res,next)=>{
    const id = req.params.businessId;

    Review.find({business_id:id})
    .select('_id review rating reply')
    .exec()
    .then(result =>{
        res.status(200).json({
            count:result.length,
            reviws: result
        });
    })
    .catch(err =>{
        res.status(500).json({
            error:err
        });
    });

}


exports.delete_review = (req,res,next)=>{
    res.status(200).json({message:"Delete review"});
}
