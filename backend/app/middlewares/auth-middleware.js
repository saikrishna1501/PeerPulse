//imports
import { setErrorResponse } from "../controllers/response-handler.js";
import UnAuthorizedException from "../exceptions/unauthorized-exception.js";
import jwt from 'jsonwebtoken';

//authorizer middleware to authenticate the incoming request
export default function authorize(request, response, next) {
    try {
        //extract the session cookie(http only cookie)
        const token = request.cookies.session;
        if(!token) {
            //if token is missing then throw UnAuthorizedException
            throw new UnAuthorizedException();
        }
        jwt.verify(token, process.env.APP_SECRET, (err, decoded) => {
            if(err) {
                //if token is invalid then throw UnAuthorizedException
                console.log(err);
                throw new UnAuthorizedException();
            }
            //add the decoded email to the request so that other middlewares or request handler can access it
            request.email = decoded.email;
            //pass the control to next middleware
            next();
        })
    }
    catch(err) {
        //send error response
        setErrorResponse(err, response);
    }
}