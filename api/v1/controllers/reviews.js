const mongoose = require("mongoose");

//models import
const Review = require("../models/review");
const Business = require("../models/business");
//const Review = require("../models/review");

exports.reviews_get_all = (req,res,next)=>{
    if(!res.locals.user) {
        return res.status(500).json({error:"Erroor occured"})
    }
    const reviewer = res.locals.user;
    
    Review.find({made_by:reviewer})
    .select('id review rating made_on reply business_name business_id')
    .exec()
    .then(result =>{
        res.status(200).json({
            count:result.length,
            reviews: result
        });

    }).catch(err =>{
        res.status(500).json({
            error:err
        });
    });
        

}


exports.get_individual_review = (req,res,next)=>{
    const id = req.params.businessId;
    console.log(id)

    if(!res.locals.user){
        return res.status(500).json({
            error:"error"
        });
    }
    const reviewer = res.locals.user;

    Review.find({business_id:id, made_by:reviewer})
    .select('id review rating made_on reply')
    .exec()
    .then(result =>{
        return res.status(200).json({
            count:result.length,
            reviews: result
        });

    })
    .catch(err =>{
       return res.status(500).json({
            error:err
        });
    });

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
    .select('_id name')
    .then(business =>{
        if(!business){
            return res.status(404).json({
                message:"Business not found"
            });
        }

        console.log(business);
        const reviewer = res.locals.user;

        const review = new Review({
            _id:mongoose.Types.ObjectId(),
            review: req.body.review,
            rating: req.body.rating,
            made_by:reviewer,
            business_id: id,
            business_name:business.name
        });
        console.log("review json created");

    
        review.save()
        .then(result =>{

                res.status(200).json({
                    message:"Review was made",
                    id:review._id,
                    business_id:result.business_id,
                    business_name:review.business_name,
                    review: result.review,
                    rating:result.rating

                });
                console.log("done");
                //console.log("6723bhchbc")
            // res.status(200).json({
            //     message:"Review was made",
            //     review: result
            // });
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
    
    const revId = req.params.reviewId;

    if(!res.locals.user){
        return res.status(500).json({
            error:"error"
        });
    }

    const reviewer = res.locals.user;

    Review.findOneAndRemove({_id:revId, made_by:reviewer}, function (err, success) {
        if (err) {
          return  res.status(500).json({
            error:"error whie deleting review"
        });

        }

        if(success){



            return res.status(200).json({
                message:"succesfully removed"
            })

        }else{
            return res.status(404).json({
                message:"Not existing"
            })
        }
      });

}
