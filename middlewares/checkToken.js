const jwt = require('jsonwebtoken');

const checkToken=async(req,res,next)=>{
   const {authorization} = req.headers;
   try{
      const token = authorization.split(' ')[1];
      const decode = await jwt.verify(token,process.env.JWT_SECRET_KEY);
         req.userName = decode.userName
         req.userId = decode.userId;
         next();
      
   }catch(err){
      res.status(403).json({
        error:'token expired or not verified'
      })
   }
}

module.exports = checkToken