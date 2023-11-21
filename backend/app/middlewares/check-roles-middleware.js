//imports
import { setErrorResponse } from "../controllers/response-handler.js";
import UnAuthorizedException from "../exceptions/unauthorized-exception.js";
import * as userService from '../services/users-service.js';

//checkRoles middleware for role based authentication(upon chaining with authorizer)
const checkRoles = (roles) => async (request, response, next) => {
    try {
        //fetch user details from DB
        const user = await userService.findUserByEmail(request.email);
        //if user's role is present in allowed roles then its successful and just pass the control to next middleware or request handler
        if(roles.includes(user.role)) {
            next();
        }
        else {
            //if user's role is not present in allowed roles then throw error response
            throw new UnAuthorizedException();
        }
    }
    catch(err) {
        //send error response
        setErrorResponse(err, response);
    }
}

//export the middleware function
export default checkRoles;