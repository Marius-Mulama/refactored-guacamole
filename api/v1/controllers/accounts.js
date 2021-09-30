const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")


const User = require("../models/user");
const user = require("../models/user");
const { use } = require("../routes/reviews");

const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/

function generate_otp(){
    // which stores all string
    var string = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let OTP = '';
        
    // Find the length of string
    var len = string.length;
    for (let i = 0; i < 8; i++ ) {
        OTP += string[Math.floor(Math.random() * len)];
    }
    return OTP;
    
}

function create_token(id,uphone,isverified){
    const token = jwt.sign({
        phone:uphone,
        userId: id,
        verified:isverified
        
    }, 
    process.env.JWT_KEY,
    {
        expiresIn:"720h"
    }
    );

    return token;

}


//Signup
exports.signup = (req,res,next) =>{
    const user_phone = req.body.phone;
    if(!regex.test(user_phone)){
        return res.status(400).json({
            error:"Invalid phone Number"
        });
    }
    
    
    User.find({phone:user_phone})
    .exec()
    .then(user =>{
        if(user.length >=1){
            return res.status(409).json({
                message: "Phone Number Registred to another account",
                phone:user[0].phone
            });
        }else{
            bcrypt.hash(req.body.password, 10, (err, hash)=>{
                if(err){
                    return res.status(500).json({
                        error:err
                    });
        
                }else {
                    const user = new User({
                        _id:new mongoose.Types.ObjectId(),
                        phone: user_phone,
                        password: hash,
                        otp: generate_otp()
                    }); 
        
                    user.save()
                    .then(result =>{
                        res.status(200).json({
                            message: 'User Created',
                            user:{
                                user_id:result._id,
                                phone:user_phone

                            }
                        });
                    })
                    .catch(err =>{
                        console.log("error herereere")
                        res.status(500).json({
                            error:err
                        });
                    });
                }
                
            });

        }
    })
    .catch(err =>{
        res.status(500).json({error:err});
    });
}

exports.confirm = (req,res,next)=>{
    var code = req.body.otpcode;
    var id = req.params.userId;

    User.findById(id).exec()
    .then(result =>{
        var user = result;
        if(result.length < 1){ 
            return res.status(403).json({
                message:"User not found",
                error:err
            });
        }else if(result.verified != false){
            return res.status(422).json({
                message:"User already Verified"
            })

        }else{

            if(code != result.otp){
                return res.status(406).json({error:"Wrong Confirmation code"});
            }

            console.log(user)

            User.updateOne({_id:id},{verified:true,otp:''}).exec()
            .then(result =>{

                console.log(typeof(result))
               console.log(user._id)



                console.log(use._id)
                console.log(user.phone)

                const token = create_token(user.user_id,user.user_phone,true)


                res.status(200).json({
                    message:"Account Verified",
                    userId:user._id,
                    phone: user.phone,
                    token:token

                });
            })
            .catch(err =>{
               return res.status(500).json({
                    error:err
                });
            });
        }
    })
    .catch(err =>{
        return res.status(501).json({
            error:err
        });
    });

}

//Login
exports.login = (req,res,next) =>{
    const user_phone = req.body.phone;

    if(!regex.test(user_phone)){
        return res.status(500).json({
            error:"Invalid phone Number"
        });
    }


    //Check if user exists
    User.find({phone:user_phone}).exec()
    .then(user =>{
        console.log(user.length)
        if(user.length < 1){
            return res.status(401).json({
                message: 'Auth failedd'
            });

        }

        bcrypt.compare(req.body.password, user[0].password, function(err, result){
            if(err){
                return res.status(401).json({
                    message: 'Auth failed'
                });
            }

            if(result){

                //Check if User has been confirmed or verified useing phone number
                const user_verified = user[0].verified;
                if(!user_verified){
                    return res.status(403).json({
                        Message: 'Not verified',
                        user: user[0]._id,
                        phone:user[0].phone
                        // verify: 'http://localhost:8000/api/v1/accounts/signup/'+user[0]._id+'/confirm/'
                    });
                }


                // const token = jwt.sign({
                //     phone:user_phone,
                //     userId: user[0]._id,
                //     verified:user[0].user_verified
                    
                // }, 
                // process.env.JWT_KEY,
                // {
                //     expiresIn:"720h"
                // }
                // );
                const token = create_token(user[0].user_id,user[0].user_phone,user[0].user_verified)

                return res.status(200).json({
                    Message: "Auth Succesfull",
                    token: token
                });
            }

            return res.status(401).json({
                message: 'Auth failed'
            });
        }
        )}

    )
    .catch(err=>{
        res.status(501).json({
            error:err
        });
    }

    );


    //res.status(200).json({message:"Login Page"});
}


exports.reset_password = (req,res,next) =>{
    res.status(200).json({message:"reset password"});
}


exports.edit_profile = (req,res,next) =>{
    res.status(200).json({message:"Edit Profile Page"});
}

exports.delete_account = (req,res,next) =>{
    res.status(200).json({message:"Delete Account"});
}