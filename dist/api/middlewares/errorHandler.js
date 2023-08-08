"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res) => {
    if (err instanceof Error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
    else {
        return res.status(err.statusCode).json({ message: err.message });
    }
};
exports.errorHandler = errorHandler;
