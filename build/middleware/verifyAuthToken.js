"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var verifyAuthToken = function (req, res, next) {
    var _a;
    try {
        var token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        var decoded = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        req.params.user = decoded;
        next();
    }
    catch (err) {
        res.status(401).send("Authorization Required ".concat(err.message));
    }
};
exports.default = verifyAuthToken;
