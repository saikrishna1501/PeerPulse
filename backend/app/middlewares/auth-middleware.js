//imports
import { setErrorResponse } from "../controllers/response-handler.js";
import UnAuthorizedException from "../exceptions/unauthorized-exception.js";
import jwt from 'jsonwebtoken';
import { createToken, TokenType } from "../services/tokenService.js";

//authorizer middleware to authenticate the incoming request
const authorize = async(request, response, next) => {
    const accessToken = request.cookies.accessToken;
    const refreshToken = request.cookies.refreshToken;
    try {
        if(!accessToken && !refreshToken) {
            throw new UnAuthorizedException();
        }
        try {
            const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
            //add the decoded email to the request so that other middlewares or request handler can access it
            request.email = decoded.email;
            //pass the control to next middleware
            next();
        }
        catch(err) {
            if(!refreshToken) {
                throw new UnAuthorizedException();
            }
            try {
                const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
                const accessToken = await createToken(decoded, TokenType.ACCESS);
                response.cookie("accessToken", accessToken , {
                    httpOnly: true,
                    secure: false, // Use 'secure' in production for HTTPS
                    sameSite: 'Strict',
                    maxAge: 10 * 60 * 1000, // 10 minutes
                });
                //add the decoded email to the request so that other middlewares or request handler can access it
                request.email = decoded.email;
                //pass the control to next middleware
                next();
            }
            catch(err) {
                throw new UnAuthorizedException();
            }
        }
    }
    catch(err) {
        //send error response
        setErrorResponse(err, response);
    }  
}


export default authorize;