"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.modules = void 0;
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("../api/routes/index"));
const modules = (app) => {
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: false }));
    app.use(express_1.default.static('public'));
    app.use(index_1.default);
    app.set('view engine', 'ejs');
    app.set('views', 'src/views');
};
exports.modules = modules;
