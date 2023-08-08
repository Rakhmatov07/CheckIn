import { Schema, model } from "mongoose";

const User: Schema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    }
},
{
    timestamps: true
});

export default model('User', User);
