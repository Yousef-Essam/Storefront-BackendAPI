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
Object.defineProperty(exports, "__esModule", { value: true });
var product_1 = require("../../models/product");
var store = new product_1.ProductStore();
describe('Product Model Testing', function () {
    describe('Checking the existence of model methods', function () {
        it('should have a create method', function () {
            expect(store.create).toBeDefined();
        });
        it('should have a read method', function () {
            expect(store.read).toBeDefined();
        });
        it('should have an update method', function () {
            expect(store.update).toBeDefined();
        });
        it('should have a delete method', function () {
            expect(store.delete).toBeDefined();
        });
    });
    describe('Basic Product Model Testing', function () {
        it('create method of the model should add a product', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, store.create({
                            name: 'Product1',
                            price: 500,
                            category: 'Generic Category',
                        })];
                    case 1:
                        result = _a.sent();
                        expect(result).toEqual({
                            id: 1,
                            name: 'Product1',
                            price: 500,
                            category: 'Generic Category',
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it('read method of the model should return a list of products', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, store.read('*')];
                    case 1:
                        result = _a.sent();
                        expect(result).toEqual([
                            {
                                id: 1,
                                name: 'Product1',
                                price: 500,
                                category: 'Generic Category',
                            },
                        ]);
                        return [2 /*return*/];
                }
            });
        }); });
        it('update method of the model should update the product name', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, store.update({ name: 'Device1' }, { id: 1 })];
                    case 1:
                        result = _a.sent();
                        expect(result[0]).toEqual({
                            id: 1,
                            name: 'Device1',
                            price: 500,
                            category: 'Generic Category',
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it('delete method of the model should empty the table', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, store.delete()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, store.read('*')];
                    case 2:
                        result = _a.sent();
                        expect(result).toEqual([]);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should create two sample products for testing other models and handlers', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, store.create({
                            name: 'Product2',
                            price: 500,
                            category: 'category1',
                        })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, store.create({
                                name: 'Product3',
                                price: 750,
                                category: 'category1',
                            })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, store.create({
                                name: 'Product4',
                                price: 1000,
                                category: 'category2',
                            })];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, store.create({
                                name: 'Product5',
                                price: 1500,
                                category: 'category2',
                            })];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, store.read('*')];
                    case 5:
                        result = _a.sent();
                        expect(result).toEqual([
                            {
                                id: 2,
                                name: 'Product2',
                                price: 500,
                                category: 'category1',
                            },
                            {
                                id: 3,
                                name: 'Product3',
                                price: 750,
                                category: 'category1',
                            },
                            {
                                id: 4,
                                name: 'Product4',
                                price: 1000,
                                category: 'category2',
                            },
                            {
                                id: 5,
                                name: 'Product5',
                                price: 1500,
                                category: 'category2',
                            },
                        ]);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
