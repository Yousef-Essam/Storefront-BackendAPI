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
var server_1 = __importDefault(require("../../server"));
var supertest_1 = __importDefault(require("supertest"));
var TokenStore_1 = __importDefault(require("../assets/TokenStore"));
var token = new TokenStore_1.default();
var request = (0, supertest_1.default)(server_1.default);
describe('Testing Products Endpoints', function () {
    describe('Testing the Create Product Endpoint', function () {
        it('should fail because Authorization Token is Required', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request.post('/products').send({
                            name: 'Product6',
                            price: 2000,
                            category: 'category3',
                        })];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(401);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should fail because the name is required', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _b = (_a = request
                            .post('/products')
                            .send({
                            price: 500,
                            category: 'category3',
                        }))
                            .set;
                        _c = ['Authorization'];
                        _d = 'Bearer ';
                        return [4 /*yield*/, token.importToken()];
                    case 1: return [4 /*yield*/, _b.apply(_a, _c.concat([_d + (_e.sent())]))];
                    case 2:
                        response = _e.sent();
                        expect(response.status).toBe(400);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should fail because the price is required', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _b = (_a = request
                            .post('/products')
                            .send({
                            name: 'Product6',
                            category: 'category3',
                        }))
                            .set;
                        _c = ['Authorization'];
                        _d = 'Bearer ';
                        return [4 /*yield*/, token.importToken()];
                    case 1: return [4 /*yield*/, _b.apply(_a, _c.concat([_d + (_e.sent())]))];
                    case 2:
                        response = _e.sent();
                        expect(response.status).toBe(400);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should fail because the category is required', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _b = (_a = request
                            .post('/products')
                            .send({
                            name: 'Product6',
                            price: 500,
                        }))
                            .set;
                        _c = ['Authorization'];
                        _d = 'Bearer ';
                        return [4 /*yield*/, token.importToken()];
                    case 1: return [4 /*yield*/, _b.apply(_a, _c.concat([_d + (_e.sent())]))];
                    case 2:
                        response = _e.sent();
                        expect(response.status).toBe(400);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should fail because the price is not a number', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _b = (_a = request
                            .post('/products')
                            .send({
                            name: 'Product6',
                            price: 'blabla',
                            category: 'category3',
                        }))
                            .set;
                        _c = ['Authorization'];
                        _d = 'Bearer ';
                        return [4 /*yield*/, token.importToken()];
                    case 1: return [4 /*yield*/, _b.apply(_a, _c.concat([_d + (_e.sent())]))];
                    case 2:
                        response = _e.sent();
                        expect(response.status).toBe(400);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should fail because the price is not a positive number', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _b = (_a = request
                            .post('/products')
                            .send({
                            name: 'Product6',
                            price: -1000,
                            category: 'category3',
                        }))
                            .set;
                        _c = ['Authorization'];
                        _d = 'Bearer ';
                        return [4 /*yield*/, token.importToken()];
                    case 1: return [4 /*yield*/, _b.apply(_a, _c.concat([_d + (_e.sent())]))];
                    case 2:
                        response = _e.sent();
                        expect(response.status).toBe(400);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should create the product successfully', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _b = (_a = request
                            .post('/products')
                            .send({
                            name: 'Product1',
                            price: 500,
                            category: 'category1',
                        }))
                            .set;
                        _c = ['Authorization'];
                        _d = 'Bearer ';
                        return [4 /*yield*/, token.importToken()];
                    case 1: return [4 /*yield*/, _b.apply(_a, _c.concat([_d + (_e.sent())]))];
                    case 2:
                        response = _e.sent();
                        expect(response.status).toBe(200);
                        expect(response.body).toEqual({
                            id: 1,
                            name: 'Product1',
                            price: 500,
                            category: 'category1',
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it('should create another 3 products successfully', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, _b, _c, _d, _e, _f, _g, _h, response, _j, _k, _l, _m;
            return __generator(this, function (_o) {
                switch (_o.label) {
                    case 0:
                        _b = (_a = request
                            .post('/products')
                            .send({
                            name: 'Product2',
                            price: 750,
                            category: 'category1',
                        }))
                            .set;
                        _c = ['Authorization'];
                        _d = 'Bearer ';
                        return [4 /*yield*/, token.importToken()];
                    case 1: return [4 /*yield*/, _b.apply(_a, _c.concat([_d + (_o.sent())]))];
                    case 2:
                        _o.sent();
                        _f = (_e = request
                            .post('/products')
                            .send({
                            name: 'Product3',
                            price: 1000,
                            category: 'category2',
                        }))
                            .set;
                        _g = ['Authorization'];
                        _h = 'Bearer ';
                        return [4 /*yield*/, token.importToken()];
                    case 3: return [4 /*yield*/, _f.apply(_e, _g.concat([_h + (_o.sent())]))];
                    case 4:
                        _o.sent();
                        _k = (_j = request
                            .post('/products')
                            .send({
                            name: 'Product4',
                            price: 1500,
                            category: 'category2',
                        }))
                            .set;
                        _l = ['Authorization'];
                        _m = 'Bearer ';
                        return [4 /*yield*/, token.importToken()];
                    case 5: return [4 /*yield*/, _k.apply(_j, _l.concat([_m + (_o.sent())]))];
                    case 6:
                        response = _o.sent();
                        expect(response.status).toBe(200);
                        expect(response.body).toEqual({
                            id: 4,
                            name: 'Product4',
                            price: 1500,
                            category: 'category2',
                        });
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('Testing the Index (Show All Products) Endpoint', function () {
        it('should get all products successfully', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request.get('/products')];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(200);
                        expect(response.body.length).toBe(4);
                        expect(response.body).toEqual([
                            {
                                id: 1,
                                name: 'Product1',
                                price: 500,
                                category: 'category1',
                            },
                            {
                                id: 2,
                                name: 'Product2',
                                price: 750,
                                category: 'category1',
                            },
                            {
                                id: 3,
                                name: 'Product3',
                                price: 1000,
                                category: 'category2',
                            },
                            {
                                id: 4,
                                name: 'Product4',
                                price: 1500,
                                category: 'category2',
                            },
                        ]);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('Testing the Show Certain Product Endpoint', function () {
        it('should get product of id 1 successfully', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request.get('/products/1')];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(200);
                        expect(response.body).toEqual({
                            name: 'Product1',
                            price: 500,
                            category: 'category1',
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it('should get product of id 2 successfully', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request.get('/products/2')];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(200);
                        expect(response.body).toEqual({
                            name: 'Product2',
                            price: 750,
                            category: 'category1',
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it('should get product of id 3 successfully', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request.get('/products/3')];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(200);
                        expect(response.body).toEqual({
                            name: 'Product3',
                            price: 1000,
                            category: 'category2',
                        });
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('Testing the Show Product By Category Endpoint', function () {
        it('should get product of category "category1" successfully', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request.get('/products/category/category1')];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(200);
                        expect(response.body).toEqual([
                            {
                                id: 1,
                                name: 'Product1',
                                price: 500,
                            },
                            {
                                id: 2,
                                name: 'Product2',
                                price: 750,
                            },
                        ]);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should get product of category "category2" successfully', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request.get('/products/category/category2')];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(200);
                        expect(response.body).toEqual([
                            {
                                id: 3,
                                name: 'Product3',
                                price: 1000,
                            },
                            {
                                id: 4,
                                name: 'Product4',
                                price: 1500,
                            },
                        ]);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
