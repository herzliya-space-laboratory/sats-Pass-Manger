import ErrorResponse from "../utils/errorResponse";
import jwt from 'jsonwebtoken';

import IAuthDBManger from "../IO_Mangers/DBManger/intrface/IAuthDBManger";
import { formatQueryForMoongose, formatPagination } from "../utils/queryFormater";

import {
    returnSuccessRespondToTheClient,
    returnRespondToTheClientWithErr,
    returnSuccessRespondToTheClientWithPage
} from '../utils/sendResponse';


export default class coursesLogic
{
    private db:IAuthDBManger;

    constructor(db)
    {
        this.db = db;
    }

    register = async (req, res, next) => {
        const { name, email, password, role } = req.body;

        const user = await this.db.createUser(
            { 
                name,
                email, 
                password, 
                role 
            });

        const token = user.getSignedJwtToken();

        returnSuccessRespondToTheClient(res, 200, token);
    }

    login = async (req, res, next) => {
        const { email, password } = req.body;

        if(!email || !password)
        {
            return next(new ErrorResponse('please provide an email and a password', 400));
        }

        const user = await this.db.findUser({email}, true);
        
        if(!user)
        {
            return next(new ErrorResponse(`invalid credentials`, 401));
        }

        const isMatch = await user.matchPassword(password);

        if(!isMatch)
        {
            return next(new ErrorResponse(`invalid credentials`, 401));
        }

        
        const token = user.getSignedJwtToken();

        returnSuccessRespondToTheClient(res, 200, token);
    }

    protect = async (req, res, next) => {
        let token;
    
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1];
        }
        else if(req.cookies.token){
            token = req.cookies.token;
        }
    
        if(!token)
        {
            return next(new ErrorResponse('not authorize to acccess this route', 401));
        }
    
    
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
    
            req.user = await this.db.getSingleUser(decode.id);
    
            next();
        } catch (error) {
            return next(new ErrorResponse('not authorize to acccess this route', 401));
        }
    }
}