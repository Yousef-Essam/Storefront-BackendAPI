"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductStore = void 0;
var database_1 = __importDefault(require("../database"));
var ProductStore = /** @class */ (function () {
    function ProductStore() {
    }
    ProductStore.createFilter = function (filter) {
        var filters = [];
        for (var key in filter) {
            if (filter[key] !== undefined) {
                var value = filter[key];
                value = typeof value === 'string' ? "'".concat(value, "'") : value;
                filters.push("".concat(key, "=").concat(value));
            }
        }
        return "".concat(filters.length !== 0 ? ' WHERE ' : '').concat(filters.join(' AND '));
    };
    ProductStore.createInsertQuery = function (newRow) {
        var columns = [];
        var values = [];
        for (var key in newRow) {
            if (newRow[key] !== undefined) {
                columns.push(key);
                var value = newRow[key];
                value = typeof value === 'string' ? "'".concat(value, "'") : value;
                values.push(value);
            }
        }
        return "INSERT INTO products (".concat(columns.join(', '), ") VALUES (").concat(values.join(', '), ") RETURNING *;");
    };
    ProductStore.createSelectQuery = function (cols, filter) {
        if (cols === void 0) { cols = '*'; }
        return "SELECT ".concat(cols == '*' ? '*' : cols.join(', '), " FROM products").concat(ProductStore.createFilter(filter), ";");
    };
    ProductStore.createUpdateQuery = function (newVals, filter) {
        var newV = [];
        for (var key in newVals) {
            if (newVals[key] !== undefined) {
                var value = newVals[key];
                value = typeof value === 'string' ? "'".concat(value, "'") : value;
                newV.push("".concat(key, "=").concat(value));
            }
        }
        var filterString = ProductStore.createFilter(filter);
        return "UPDATE products SET ".concat(newV.join(', ')).concat(filterString, " RETURNING *;");
    };
    ProductStore.createDeleteQuery = function (filter) {
        return "DELETE FROM products".concat(ProductStore.createFilter(filter), ";");
    };
    ProductStore.prototype.create = function (newRow) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, query, result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        query = ProductStore.createInsertQuery(newRow);
                        return [4 /*yield*/, conn.query(query)];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        err_1 = _a.sent();
                        throw new Error("Can not add new row to Table Products ".concat(err_1.message));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ProductStore.prototype.read = function (cols, filter) {
        if (cols === void 0) { cols = '*'; }
        return __awaiter(this, void 0, void 0, function () {
            var conn, query, result, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        query = ProductStore.createSelectQuery(cols, filter);
                        return [4 /*yield*/, conn.query(query)];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows];
                    case 3:
                        err_2 = _a.sent();
                        throw new Error("Can not read from Table Products ".concat(err_2.message));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ProductStore.prototype.update = function (newVals, filter) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, query, result, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        query = ProductStore.createUpdateQuery(newVals, filter);
                        return [4 /*yield*/, conn.query(query)];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows];
                    case 3:
                        err_3 = _a.sent();
                        throw new Error("Can not update Table Products ".concat(err_3.message));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ProductStore.prototype.delete = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, query, result, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        query = ProductStore.createDeleteQuery(filter);
                        return [4 /*yield*/, conn.query(query)];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows];
                    case 3:
                        err_4 = _a.sent();
                        throw new Error("Can not delete from Table Products ".concat(err_4.message));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return ProductStore;
}());
exports.ProductStore = ProductStore;
