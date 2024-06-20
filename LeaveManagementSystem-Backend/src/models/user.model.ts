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
        enum : ['admin', 'user'],
        required : [true, 'role is required!!']
    },
    password :{
        type: String,
        required : [true, 'password is required!!']
    },
    token : {
        type: String
    }
}, {
    timestamps: true
})

userSchema.pre('save',async function (next){
    try{
        const newPswd = await bcrypt.hash( this.password, 10);
        this.password = newPswd;
        next();
    }catch(err: any){
        return err;
    }
})

export const userModel = mongoose.model<IuserModel>('users', userSchema);