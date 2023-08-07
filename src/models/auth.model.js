import mongoose from "mongoose";
const { Schema, model } = mongoose;

const User = new Schema({
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
