
import { returnRespondToTheClientWithErr } from '../../../utils/sendResponse';

export default function errorHandler(err, req, res, next)
{

    console.log(err);
    
    if(err.code === 11000 || err.name === "ValidationError")
    {
        err.statusCode = 400;
    }

    returnRespondToTheClientWithErr(res, err.statusCode || 500, null, err.message || "server error");
}