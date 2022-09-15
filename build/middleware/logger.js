"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var logger = function (req, res, next) {
    if (process.env.ENV !== 'test')
        console.log("--- ".concat(req.method, " request on ").concat(req.path));
    next();
};
exports.default = logger;
