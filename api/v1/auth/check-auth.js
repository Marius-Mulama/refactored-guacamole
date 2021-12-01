const jwt = require('jsonwebtoken');


module.exports = (req,res,next)=>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        //console.log(token);
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded;
        //console.log(12)
        //console.log(req.userData);
        
        if(decoded.class == "user"){
            if(decoded.verified){

                res.locals.user = decoded.userId;

                next();
            }else{
                return res.status(401).json({
                    Message: "auth Failed1"
                });

            }
            //next();
        }else{
            return res.status(401).json({
                Message: "auth Failed"
            });
        }
        //next();

    }catch(error){
        //console.log(error);
        return res.status(401).json({
            Message: "auth Failedd"
        });
    }
    
    //next();
    
}