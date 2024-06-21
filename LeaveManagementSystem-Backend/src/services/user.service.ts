import { injectable } from "inversify";
import { IuserLogin, IuserModel, IuserSignup } from "../interfaces";
import { userModel } from "../models";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from 'config';
import mongoose from "mongoose";

@injectable()
export class userService{
    async signup(bodyData: IuserSignup):Promise<object>{
        await userModel.create(bodyData);
        return {message : "user signuped!!", status: true}
    }

    async login(bodyData: IuserLogin):Promise<object>{
        const foundUser = await userModel.findOne({username: bodyData.username}) as IuserModel;
        if(foundUser){
            const checkPassword = await bcrypt.compare(bodyData.password, foundUser.password);
            if(checkPassword){
                const data = {
                    id : foundUser._id,
                    username : foundUser.username
                }
                const token: string = jwt.sign(data, config.get("SECRETE_KEY"));
                const temp = await userModel.findOneAndUpdate({_id:foundUser._id},{$set : {token: token}});
                return {status : true, message :"user logged in!!", token: token, username : foundUser.username, role: foundUser.role};
            }else{
                return {status : false, message :"bad creadentials!!"};
            }
        }else{
            return {status: false, message:"user not found please login!!"}
        }
    }
    
    async logout(userId : string): Promise<object>{
        await userModel.findOneAndUpdate({_id: userId},{$unset:{token : {$exists : true}}});
        return {message : "Logout Successfully!", status: true};
    }

    async getUser(username: string){
        const data = await userModel.findOne({username: username});
        return {data : data, status: true};
    }
}