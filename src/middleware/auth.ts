import { Request, NextFunction } from "express"
import jwt_decode from "jwt-decode"


interface IToken {
    id: String,    
    role: String,
    iat: number,
    exp: number
  }
const authenticate = (req: Request, res: any, next: NextFunction) => {
    
    try{
            
        let token;
        // check token from request header
        if (
          req.headers.authorization &&
          req.headers.authorization.startsWith('Bearer')
        ) {
          token = req.headers.authorization.split(' ')[1];
        }
        // If token doesn't exist in the request header
        if (!token) {
          return next(new Error('Please Log in and try again'));
        }
        // Decode token
        const decodedToken:IToken = jwt_decode(token);
        console.log(decodedToken, "decoded token")
        // @ts-ignore
       const currentTime = Date.parse(new Date)/1000
       const expiredTime = decodedToken.exp
       console.log("current time", currentTime)
       console.log("expired time", expiredTime)
       if( currentTime > expiredTime){
        return next(new Error('expired token'))
       }
       
       req.user = decodedToken?.id?.toLocaleLowerCase()   
      
      next();
    }
    catch(e){
       return res.status(500).json({
        error:e,
        message:"failed"
       })
    }
    
   
}

export default authenticate