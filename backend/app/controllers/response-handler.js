//imports
import AlreadyNotRegisteredEvent from "../exceptions/already-not-registered-event.js";
import AlreadyRegisteredEvent from "../exceptions/already-registered-event.js";
import ExpiredInvalidTokenException from "../exceptions/expired-invalid-token-exception.js";
import PasswordMissMatchError from "../exceptions/password-missmatch-error.js";
import UnAuthorizedException from "../exceptions/unauthorized-exception.js";
import UnverifiedEmailException from "../exceptions/unverified-email-exception.js";
import UserAlreadyExistsException from "../exceptions/user-already-exists-exception.js";
import UserNotFoundException from "../exceptions/user-not-found-exception.js";


//send successful response
export const setResponse = (data, response) => {
    response.status(200).json(data);
}
//send successful response with http only cookie
export const setHttpOnlyCookiesAndResponse = (data,cookies, response) => {
    //set cookie
    cookies.forEach((cookie) => {
        response.cookie(cookie.name, cookie.value, cookie.options);
    })
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
    //if err matches UserAlreadyExistsException
    else if(err instanceof UserAlreadyExistsException) {
        response.status(err.statusCode()).json({
            code: "UserDetailsConflict",
            message: "User already exists"
        })
    }
    //if err matches ExpiredInvalidTokenException
    else if(err instanceof ExpiredInvalidTokenException) {
        response.status(err.statusCode()).json({
            code: "ExpiredOrInvalidToken",
            message: "Either token is expired/invalid"
        })
    }
    //if err matches UnverifiedEmailException
    else if(err instanceof UnverifiedEmailException) {
        response.status(err.statusCode()).json({
            code: "UnVerifiedEmail",
            message: "Email not verified by the user"
        })
    }
    else if(err instanceof AlreadyRegisteredEvent) {
        response.status(err.statusCode()).json({
            code: "AlreadyRegisteredEvent",
            message: "User has already registered for this event"
        })
    }
    else if(err instanceof AlreadyNotRegisteredEvent) {
        response.status(err.statusCode()).json({
            code: "AlreadyNotRegisteredEvent",
            message: "User has not registered for this event. So, no action needed"
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