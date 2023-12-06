export default class UserAlreadyExistsException extends Error {
    constructor(message = "User already exists") {
        super(message);
        // assign the error class name in your custom error (as a shortcut)
        this.name = this.constructor.name

        // capturing the stack trace keeps the reference to your error class
        Error.captureStackTrace(this, this.constructor);
        // setting status code
        this.status = 409;
    }

    //get the status code
    statusCode() {
        return this.status
    }
}