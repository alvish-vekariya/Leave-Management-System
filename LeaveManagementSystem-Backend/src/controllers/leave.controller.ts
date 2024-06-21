import { inject, injectable } from "inversify";
import { controller, httpGet, httpPost, httpPut } from "inversify-express-utils";
import { leaveService } from "../services";
import { Request, Response } from "express";
import { IleaveModel } from "../interfaces";

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
            const bodyData = req.body as IleaveModel;
            res.json(await this.leaveServices.addLeave(bodyData));
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
            res.json(this.leaveServices.reviewLeave(leaveId, status));
        }catch(err: any){
            res.json({status: false, message: err.message});
        }
    }
}