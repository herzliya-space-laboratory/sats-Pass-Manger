import IAPIManager from "./IAPIManager";
import express = require("express");
import { Server } from "http";

import cors from 'cors';

import logger from "./middleware/logger";
import errorHandler from "./middleware/error";

 
export default class expressApi implements IAPIManager
{

	private server: Server;
	private app;

    constructor(port: number)
    {
        this.app = express();

        

        const server = this.app.listen(
            port,
            () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`)
        );

        this.initMiddlewareBefore();

        this.server = server;
    }

    getApp() {
        return this.app;
    }

    private initMiddlewareBefore(): void
    {
        this.app.use(express.json());

        if(process.env.NODE_ENV === 'development') this.app.use(logger);
        
        this.app.use(cors());
        
    }

    public initMiddleware(): void
    {
        this.app.use(errorHandler);
        
    }

    public addRoute(method:string, path: string, functionToCall: (req: any, res: any, next: any) => void )
    {
        (this.app as any)[method](path, functionToCall);
    }

    close(): void {
        this.server.close();
    }
}
