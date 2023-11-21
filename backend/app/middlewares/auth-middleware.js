//imports
import { setErrorResponse } from "../controllers/response-handler.js";
import UnAuthorizedException from "../exceptions/unauthorized-exception.js";
import jwt from 'jsonwebtoken';

//authorizer middle to authenticate the incoming request
export default function authorize(request, response, next) {
    try {
        const token = request.cookies.session;
        if(!token) {
            throw new UnAuthorizedException();
        }
        jwt.verify(token, process.env.APP_SECRET, (err, decoded) => {
            if(err) {
                console.log(err);
                throw new UnAuthorizedException();
            }
            request.email = decoded.email;
            next();
        })
    }
    catch(err) {
        setErrorResponse(err, response);
    }
}