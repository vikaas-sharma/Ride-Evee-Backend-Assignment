const JWT = require('jsonwebtoken');

module.exports =async(req,res,next)=>{
    try{
         const token=req.headers['authorization'].split(" ")[1];
         JWT.verify(token,process.env.JWT_SECRET_KEY,(err,decode)=>{
                    if(err){
                        return res.status(401).send({
                            success:false,
                            message:'Un-Authorize User'
                        })
                    }else{
                        // req.body._id=decode.id;
                        req.user=decode;
                        next();
                    }
         })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Please provide auth token',
            error:error.message
        })
    }
}