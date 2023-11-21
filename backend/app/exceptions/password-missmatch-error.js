export default class PasswordMissMatchError extends Error {
    constructor(message = "Password doesn't match") {
        super(message);
        // assign the error class name in your custom error (as a shortcut)
        this.name = this.constructor.name

        // capturing the stack trace keeps the reference to your error class
        Error.captureStackTrace(this, this.constructor);

        // setting status code
        this.status = 403;
    }
    //get the status code
    statusCode() {
        return this.status
    }
}