import { Request, Response, NextFunction } from "express";
import { inject, injectable } from "inversify";
import { BaseMiddleware } from "inversify-express-utils";
import config from 'config';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';

@injectable()
export class checkUserMiddleware extends BaseMiddleware{
    handler(req: Request, res: Response, next: NextFunction): void {
        const token = req.headers.authorization?.split(' ')[1] as string;
        try{
            const tokenData = jwt.verify(token, config.get('SECRETE_KEY'));
            next();
        }catch(err:any){
            if(err instanceof JsonWebTokenError){
                res.json({status: false, message: "login again!!"})
            }else{
                res.json({status: false, message: err.message})
            }
        }
    }
}