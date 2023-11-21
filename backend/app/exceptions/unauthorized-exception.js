export default class UnAuthorizedException extends Error {
    constructor(message = "Either session token is missing/invalid or user is not authorized to access this resource") {
        super(message);
        // assign the error class name in your custom error (as a shortcut)
        this.name = this.constructor.name

        // capturing the stack trace keeps the reference to your error class
        Error.captureStackTrace(this, this.constructor);
        // setting status code
        this.status = 401;
    }
    
    //get the status code
    statusCode() {
        return this.status
    }
}