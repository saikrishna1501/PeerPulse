export default class ExpiredInvalidTokenException extends Error {
    constructor(message = "Either token is expired/invalid") {
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