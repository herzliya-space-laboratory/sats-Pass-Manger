export default class ErrorResponse extends Error 
{
    private statusCode;
    constructor(msg, statusCode)
    {
        super(msg);
        this.statusCode = statusCode;
    }
}
