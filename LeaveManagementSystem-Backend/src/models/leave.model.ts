import mongoose, { mongo } from "mongoose";
import { IleaveModel } from "../interfaces";
import { NextFunction } from "express";

const leaveSchema = new mongoose.Schema<IleaveModel>({
    userId : {
        type : mongoose.Schema.ObjectId,
        required: [true, 'user is required'],
        ref: 'users'
    },
    leaveType: {
        type: String,
        enum : ['sick', 'personal'],
        required : [true, 'leaveType is required!!']
    },
    startDate : {
        type : Date,
        required : [true, 'StartDate is required!!']
    },
    endDate : {
        type : Date,
        required : [true, 'endDate is required!!']
    },
    reason : {
        type : String, 
        required: [true, 'reason is required!!']
    },
    status :{
        type: String,
        enum : ['pending', 'approved', 'rejected'],
        default : 'pending'
    },
    totalDays : {
        type: Number
    }
},{
    timestamps: true
});

leaveSchema.pre('save', async function(next){
    try{
        const sdate = new Date(this.startDate) as any;
        const edate = new Date(this.endDate) as any;

        this.totalDays = Math.ceil((edate - sdate)/(1000*60*60*24)) + 1;
        next();

    }catch(err: any){
        console.log(err.message);
    }
})


export const leaveModel = mongoose.model('leaves', leaveSchema);