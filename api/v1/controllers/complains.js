const pool  = require('../../../db');
const queries = require('./queries');


//Get all user complains
exports.complain_get_all = (req,res)=>{
    const complainantId = res.locals.user;

    pool.query(queries.viewAll,[complainantId], (error,results)=>{
        if(error){
            return res.status(500).json({
                message:"An Error Occured"
            });
        }

        //console.log(results)

        res.status(200).json({
            count:results.rows.length,
            results:results.rows
        });
    });

    // return res.status(200).json({
    //     message:"Working Well"
    // })
}

//Get complains by their status
exports.complain_get_by_status = (req,res)=>{
    const complainantId = res.locals.user;

    console.log(req.query.q)
    let queried = req.query.q;
    queried = queried.toLowerCase();


    pool.query(queries.viewQueried,[queried,complainantId], (error,results)=>{
        if(error){
            res.status(500).json({
                message:"An Error Occured"
            });
        }

        //console.log(results)

        res.status(200).json({
            count:results.rows.length,
            results:results.rows
        });
    });

    
    // return res.status(200).json({
    //     message:"Get response by category Working"
    // });
}

//Get individual complain
exports.complain_get_one = (req,res)=>{
    const complainId = req.params.complainId;
    const complainant = res.locals.user;


    pool.query(queries.getOne,[complainId,complainant], (error,results)=>{
        if(error){
            res.status(500).json({
                message:"An Error Occured"
            });
        }

        console.log(results)

        res.status(200).json({
            count:results.rows.length,
            results:results.rows
        });
    });

    // return res.status(200).json({
    //     message:"individual Complain Working"
    // });

}

exports.make_complain = (req,res,next)=>{
    const company = req.params.company;
    const category = req.body.category;
    const state = 0;
    const complainDetails = req.body.details;
    const complainantId = res.locals.user;

    pool.query(queries.addComplain,[category,state,complainantId,complainDetails,company],(error,result)=>{
        if(error){
            console.log(error)
            return res.status(500).json({
                message:"Did not work"
            })
        }else{
            res.status(201).json({
                message:"Complain made Succesfully"
            })
        }
    });

    // res.status(201).json({
    //     message:"Complain made Succesfully"
    // });
    
    return;

    

   
}

// module.exports = {

// }