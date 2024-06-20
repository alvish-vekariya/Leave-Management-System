import 'reflect-metadata';
import { controller, httpGet, httpPost } from 'inversify-express-utils';
import { Request, Response } from 'express';
import { userService } from '../services';
import { inject } from 'inversify';
import { IuserLogin, IuserSignup } from '../interfaces';
import mongoose from 'mongoose';

@controller('/user')
export class userController {
    constructor(@inject(userService) private userServices: userService){}

    @httpPost('/signup')
    async signup(req: Request, res: Response){
        try{
            const bodyData: IuserSignup = req.body;
            res.json(await this.userServices.signup(bodyData));
        }catch(err:any){
            res.json({message: err.message, status: false});
        }
    }

    @httpPost('/login')
    async login(req: Request, res: Response){
        try{
            const bodyData : IuserLogin  = req.body;
            res.json(await this.userServices.login(bodyData));
        }catch(err: any){
            res.json();
        }
    }

    @httpPost('/logout')
    async logout(req: Request, res: Response){
        try{
            const userId = req.query.userId as string;
            res.json(await this.userServices.logout(userId));
        }catch(err: any){
            res.json({status: false, message: err.message});
        }
    }
}