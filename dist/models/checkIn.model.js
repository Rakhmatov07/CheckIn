"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CheckIn = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.ObjectId,
        required: true,
    },
    entranceTime: {
        type: Date,
    },
    exitTime: {
        type: Date
    }
});
exports.default = (0, mongoose_1.model)('CheckIn', CheckIn);
