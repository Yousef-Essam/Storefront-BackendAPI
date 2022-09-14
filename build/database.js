"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var pg_1 = require("pg");
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var Client = new pg_1.Pool();
if (process.env.ENV === 'test')
    Client = new pg_1.Pool({
        user: process.env.PG_USER,
        password: process.env.PG_PASS,
        database: process.env.PG_DB_TEST,
        host: process.env.PG_HOST,
    });
if (process.env.ENV === 'dev')
    Client = new pg_1.Pool({
        user: process.env.PG_USER,
        password: process.env.PG_PASS,
        database: process.env.PG_DB,
        host: process.env.PG_HOST,
    });
exports.default = Client;
