"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var logger_1 = __importDefault(require("./middleware/logger"));
var users_1 = __importDefault(require("./handlers/users"));
var products_1 = __importDefault(require("./handlers/products"));
var orders_1 = __importDefault(require("./handlers/orders"));
var app = (0, express_1.default)();
var port = 3000;
app.use(logger_1.default);
app.use(express_1.default.json());
app.use('/users', users_1.default);
app.use('/products', products_1.default);
app.use('/orders', orders_1.default);
app.listen(port, function () {
    console.log("-- server listening on port ".concat(port));
});
