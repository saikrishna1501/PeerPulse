import { setErrorResponse } from "../controllers/response-handler.js";
import UnAuthorizedException from "../exceptions/unauthorized-exception.js";
import * as userService from '../services/users-service.js';

const checkRoles = (roles) => async (request, response, next) => {
    try {
        const user = await userService.findUserByEmail(request.email);
        if(roles.includes(user.role)) {
            next();
        }
        else {
            throw new UnAuthorizedException();
        }
    }
    catch(err) {
        setErrorResponse(err, response);
    }
}

export default checkRoles;