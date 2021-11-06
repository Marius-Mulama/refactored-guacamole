const pool  = require('../../../db');

exports.complain_get_all = (req,res,next)=>{
    return res.status(200).json({
        message:"Working Well"
    })
}