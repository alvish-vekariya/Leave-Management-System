import { inject, injectable } from "inversify";
import { controller, httpGet, httpPost, httpPut } from "inversify-express-utils";
import { leaveService } from "../services";
import { Request, Response } from "express";
import { IleaveModel } from "../interfaces";
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from 'config';

@controller('/leave')
export class leaveController{
    constructor(@inject(leaveService) private leaveServices: leaveService){}

    @httpGet('/admin/getLeaves')
    async adminGetLeaves(req: Request, res: Response){
        try{
            res.json(await this.leaveServices.adminGetLeaves());
        }catch(err: any){
            res.json({status: false, message:err.message});
        }
    }

    @httpPost('/user/addLeaves')
    async addLeave(req: Request, res: Response){
        try{
            const token = req.headers.authorization?.split(' ')[1] as string;
            const tokenData = jwt.verify(token, config.get("SECRETE_KEY")) as JwtPayload;
            const userId = tokenData.id as string;
            const bodyData = req.body as IleaveModel;
            const leaveData: IleaveModel = {
                userId : userId,
                leaveType : bodyData.leaveType,
                startDate : bodyData.startDate,
                endDate : bodyData.endDate,
                reason : bodyData.reason
            }
            res.json(await this.leaveServices.addLeave(leaveData));
        }catch(err: any){
            res.json({status: false, message:err.message});
        }
    }

    @httpGet('/user/getLeaves')
    async userGetLeaves(req: Request, res: Response){
        try{
            const userId = req.query.userId as string;
            res.json(await this.leaveServices.userGetLeaves(userId));
        }catch(err: any){
            res.json({status: false, message:err.message});
        }
    }

    @httpPut('/admin/reviewLeave')
    async reviewLeave(req: Request, res: Response){
        try{
            const leaveId = req.body.leaveId as string;
            const status = req.body.status as string;
            res.json(await this.leaveServices.reviewLeave(leaveId, status));
        }catch(err: any){
            res.json({status: false, message: err.message});
        }
    }

    @httpGet('/user/getLeavesCustom')
    async userGetCustomleave(req: Request, res: Response){
        try{
            const userId = req.query.userId as string;
            const status = req.query.status as string;
            res.json(await this.leaveServices.userGetCustomleave(userId, status));
        }catch(err: any){
            res.json({status: false, message:err.message});
        }
    }

    @httpGet('/admin/getRejectedLeaves')
    async adminGetRejectedLeaves(req: Request, res: Response){
        try{
            res.json(await this.leaveServices.adminGetRejected());
        }catch(err: any){
            res.json({status: false, message : err.messgae});
        }
    }

    @httpGet('/admin/getApprovedLeaves')
    async adminGetApprovedLeaves(req: Request, res: Response){
        try{
            res.json(await this.leaveServices.adminGetApproved());
        }catch(err: any){
            res.json({status: false, message : err.messgae});
        }
    }
}