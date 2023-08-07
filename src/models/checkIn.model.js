import { Schema, model } from "mongoose";

const CheckIn = new Schema({
    userId: {
        type: Schema.ObjectId,
        required: true,
    },
    entranceTime: {
        type: Date,
    },
    exitTime: {
        type: Date
    }
});

export default model('CheckIn', CheckIn);