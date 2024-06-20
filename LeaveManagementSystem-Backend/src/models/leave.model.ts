import mongoose, { mongo } from "mongoose";

const leaveSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.ObjectId,
        required: [true, 'user is required'],
        ref: 'users'
    },
    leaveType: {
        type: String,
        required : [true, 'leaveType is required!!']
    },
    startDate : {
        type : Date,
        required : [true, 'StartDate is required!!']
    },
    endDate : {
        type : Date,
        required : [true, 'StartDate is required!!']
    },
    reason : {
        type : String, 
        required: [true, 'reason is required!!']
    }

},{
    timestamps: true
});

export const leaveModel = mongoose.model('leaves', leaveSchema);