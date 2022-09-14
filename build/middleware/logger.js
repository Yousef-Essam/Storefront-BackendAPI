"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var logger = function (req, res, next) {
    console.log("--- ".concat(req.method, " request on ").concat(req.path));
    next();
};
exports.default = logger;
