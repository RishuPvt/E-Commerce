class ApiError extends Error {
    constructor(
        statusCode,
        message="Something went wrong",
        errors=[],
        stack=""
    )
    {
        super(message);
        this.statusCode = statusCode; // HTTP status code of the error
        this.data = null; // Additional data related to the error (not used in this constructor)
        this.message = message; // Error message
        this.success = false; // Indicate the operation was not successful
        this.errors = errors; // Detailed error messages or objects


        // Capture stack trace if provided, otherwise use `Error.captureStackTrace`
        if (stack) {
            this.stack = stack; // Use the provided stack trace
        } else {
            Error.captureStackTrace(this, this.constructor); // Capture the stack trace for the current instance
        }
    }
}
export { ApiError };