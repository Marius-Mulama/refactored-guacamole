const mongoose = require('mongoose');
const pool  = require('../../../db');
const queries = require('../queries/businessqueries');

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
    .cc()
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

exports.search_business = (req,res,next)=>{
    console.log(req.query.q)
    let query = req.query.q;
    query = query.charAt(0).toUpperCase() + query.slice(1);
    //{ rank: { $regex: 'Commander' } }
    Business.find({$or:[{name:{ $regex: query}},{industry:{ $regex: query}}]} )
    .select('_id name industry')
    .exec()
    .then(result =>{
        if(result.length<1){
            res.status(203).json({
                count:result.length,
                business: "Nothing found"
            });
        }
        res.status(200).json({
            count:result.length,
            business: result
        });
    })
    .catch(err =>{
        res.status(500).json({
            error:err
        });
    });
    //return res.status(200).json({message:"Search Working"})


}

exports.review_reply = (req,res,next)=>{
    res.status(200).json({message:"working"});
}

exports.to_processing = (req,res,next)=>{
    var complainId = req.params.complainId;
    complainId = parseInt(complainId)

    //console.log(complainId)

    pool.query(queries.makeStateProcessing,[1,complainId], (error,results)=>{
        if(error){
            console.log(error)
            res.status(500).json({
                message:"An Error Occured"
            });
        }

        //console.log(results)

        return res.status(200).json({
            message:"Status Changed to Processing"
        })

    });

}

exports.close_complain =(req,res,next)=>{
    var complainId = req.params.complainId;
    complainId = parseInt(complainId)

    pool.query(queries.makeStateClosed,[2,complainId], (error,results)=>{
        if(error){
            console.log(error)
            res.status(500).json({
                message:"An Error Occured"
            });
        }

        //console.log(results)

        return res.status(200).json({
            message:"Status Changed to Closed"
        })

    });


}

exports.make_remarks = (req,res)=>{
    var complainId = req.params.complainId;
    const remarks = req.body.remarks;

    complainId = parseInt(complainId)

    pool.query(queries.makeRemark,[remarks,complainId],(error,result)=>{
        if(error){
            console.log(error)
            return res.status(500).json({
                message:"Did not work"
            })
        }else{
            res.status(201).json({
                message:"Remark made Succesfully"
            })
        }
    });


}