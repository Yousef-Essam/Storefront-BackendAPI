"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
var resetDb = function () {
    (0, child_process_1.execSync)('npx db-migrate --env test down -c 5 && npx db-migrate --env test up');
};
exports.default = resetDb;
