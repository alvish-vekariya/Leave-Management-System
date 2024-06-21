import { injectable } from "inversify";
import { leaveModel } from "../models";
import { IleaveModel } from "../interfaces";
import mongoose from "mongoose";

@injectable()
export class leaveService{
    async adminGetLeaves(){
        const data = await leaveModel.aggregate(
            [
                {
                  $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "user"
                  }
                },
                {
                  $project: {
                    _id:1,
                    userId:1,
                    startDate:1,
                    endDate:1,
                    totalDays:1,
                    reason :1,
                    status :1,
                    leaveType : 1,
                    username : "$user.username"
                  }
                },
                {
                  $unwind: {
                    path: "$username"
                  }
                }
              ]
        );
        return {status: true, data: data};
    }

    async userGetLeaves(userId: string){
        const data = await leaveModel.find({userId : userId})
        return {status: true, data: data};
    }

    async reviewLeave(leaveId : string,status: string){
        await leaveModel.findOneAndUpdate({_id: leaveId, status: status});
        if(status == 'approved'){
            return {status: true, message: 'leave approved!'};
        }else{
            return {status: true, message : 'leave rejected!'};
        }
    }

    async addLeave(bodyData: IleaveModel){
        await leaveModel.create(bodyData);
        return {status: true, message:"leaved applied!!"};
    }
}