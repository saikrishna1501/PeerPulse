//imports
import PasswordMissMatchError from "../exceptions/password-missmatch-error.js";
import UnAuthorizedException from "../exceptions/unauthorized-exception.js";
import UserNotFoundException from "../exceptions/user-not-found-exception.js";

//send successful response
export const setResponse = (data, response) => {
    response.status(200).json(data);
}
//send successful response with http only cookie
export const setHttpOnlyCookiesAndResponse = (data,cookie, response) => {
    //set cookie
    response.cookie(cookie.name, cookie.value, cookie.options);
    //send response
    response.status(200).json(data);
}

//send Error response
export const setErrorResponse = (err, response) => {
    console.log("Error = ", err);
    //if err matches UserNotFoundException
    if(err instanceof UserNotFoundException) {
        response.status(err.statusCode()).json({
            code: "UserNotFound",
            message: "User not found"
        })
    }
    //if err matches PasswordMissMatchError
    else if(err instanceof PasswordMissMatchError) {
        response.status(err.statusCode()).json({
            code: "PasswordMissMatch",
            message: "Incorrect password"
        })
    }
    //if err matches UnAuthorizedException
    else if(err instanceof UnAuthorizedException) {
        response.status(err.statusCode()).json({
            code: "UnAuthorized",
            message: "Either session token is missing/invalid or user is not authorized to access this resource"
        })
    }
    //if none of the above Exceptions match then return a Generic Response
    else {
        response.status(500).json({
            code: "ServiceError",
            message: "Some thing went wrong"
        })
    }
    
}