import mongoose from "mongoose";
import { IuserModel } from "../interfaces";
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema<IuserModel>({
    username : {
        type: String,
        required : [true, 'username is required!!'],
        unique : [true, 'username is already exists!']
    },
    fullname : {
        type: String,
        required : [true, 'fullname is required!!']
    },
    email : {
        type : String,
        required: [true, 'email is required!!']
    },
    role :{
        type : String,
        enum : ['admin', 'employee'],
        required : [true, 'role is required!!']
    },
    password :{
        type: String,
        required : [true, 'password is required!!']
    },
    token : {
        type: String
    },
    dob : {
        type: Date,
        required : [true, 'DOB is required!!']
    },
    gender : {
        type : String,
        required : [true, 'role is required!!']
    },
    age : {
        type : Number
    }
}, {
    timestamps: true
})

userSchema.pre('save',async function (next){
    try{
        const newPswd = await bcrypt.hash( this.password, 10);
        this.password = newPswd;
        const today = new Date() as any;
        const givenDob = new Date(this.dob) as any;
        this.age = Math.floor((today-givenDob)/(1000*60*60*24*365));
        next();
    }catch(err: any){
        return err;
    }
})

export const userModel = mongoose.model<IuserModel>('users', userSchema);