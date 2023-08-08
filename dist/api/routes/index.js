"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_route_1 = require("./auth.route");
const checkIn_route_1 = require("./checkIn.route");
exports.default = [auth_route_1.router, checkIn_route_1.router];
