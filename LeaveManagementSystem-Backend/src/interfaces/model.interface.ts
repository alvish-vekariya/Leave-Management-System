import mongoose from "mongoose"

export interface IuserModel {
    _id?: string,
    username : string | undefined,
    fullname : string,
    password: string,
    role: string,
    email: string,
    token?: string,
    dob: Date,
    gender: string,
    age : number
}

export interface IleaveModel{
    _id ?: string,
    userId : mongoose.ObjectId,
    startDate : Date,
    endDate : Date,
    reason :  string,
    status : string,
    leaveType : string,
    totalDays : number
}