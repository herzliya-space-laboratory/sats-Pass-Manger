export default class ErrorResponse extends Error 
{
    private statusCode;
    constructor(statusCode, msg)
    {
        super(msg);

        this.statusCode = statusCode;

        Error.captureStackTrace(this, this.constructor);
    }
}
