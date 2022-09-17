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
var dropDb_1 = __importDefault(require("../assets/dropDb"));
var token = new TokenStore_1.default();
var request = (0, supertest_1.default)(server_1.default);
describe('Testing Orders Endpoints', function () {
    describe('Testing Create Orders Endpoint', function () {
        it('should fail for requiring Authorization Token', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request
                            .post('/orders/create')
                            .send({ products: [{ product_id: 2, quantity: 2 }] })];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(401);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should fail for the absence of products array', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _b = (_a = request
                            .post('/orders/create'))
                            .set;
                        _c = ['Authorization'];
                        _d = 'Bearer ';
                        return [4 /*yield*/, token.importToken()];
                    case 1: return [4 /*yield*/, _b.apply(_a, _c.concat([_d + (_e.sent())]))
                            .send({ someKey: 'blabla' })];
                    case 2:
                        response = _e.sent();
                        expect(response.status).toBe(400);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should successfully create order', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _b = (_a = request
                            .post('/orders/create'))
                            .set;
                        _c = ['Authorization'];
                        _d = 'Bearer ';
                        return [4 /*yield*/, token.importToken()];
                    case 1: return [4 /*yield*/, _b.apply(_a, _c.concat([_d + (_e.sent())]))
                            .send({ products: [{ product_id: 2, quantity: 2 }] })];
                    case 2:
                        response = _e.sent();
                        expect(response.status).toBe(200);
                        expect(response.body).toEqual({
                            order_id: 1,
                            products: [
                                {
                                    id: 2,
                                    name: 'Product2',
                                    price: 750,
                                    category: 'category1',
                                    quantity: 2,
                                },
                            ],
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it('should successfully create another order', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _b = (_a = request
                            .post('/orders/create'))
                            .set;
                        _c = ['Authorization'];
                        _d = 'Bearer ';
                        return [4 /*yield*/, token.importToken()];
                    case 1: return [4 /*yield*/, _b.apply(_a, _c.concat([_d + (_e.sent())]))
                            .send({ products: [{ product_id: 1, quantity: 3 }] })];
                    case 2:
                        response = _e.sent();
                        expect(response.status).toBe(200);
                        expect(response.body).toEqual({
                            order_id: 2,
                            products: [
                                {
                                    id: 1,
                                    name: 'Product1',
                                    price: 500,
                                    category: 'category1',
                                    quantity: 3,
                                },
                            ],
                        });
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('Testing Add Products To Orders Endpoint', function () {
        it('should fail for requiring Authorization Token', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request
                            .post('/orders/1')
                            .send({ products: [{ product_id: 2, quantity: 2 }] })];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(401);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should fail because there is no order with this id', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _b = (_a = request
                            .post('/orders/3'))
                            .set;
                        _c = ['Authorization'];
                        _d = 'Bearer ';
                        return [4 /*yield*/, token.importToken()];
                    case 1: return [4 /*yield*/, _b.apply(_a, _c.concat([_d + (_e.sent())]))
                            .send({ products: [{ product_id: 2, quantity: 2 }] })];
                    case 2:
                        response = _e.sent();
                        expect(response.status).toBe(404);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should fail for the absence of products array', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _b = (_a = request
                            .post('/orders/1'))
                            .set;
                        _c = ['Authorization'];
                        _d = 'Bearer ';
                        return [4 /*yield*/, token.importToken()];
                    case 1: return [4 /*yield*/, _b.apply(_a, _c.concat([_d + (_e.sent())]))
                            .send({ someKey: 'blabla' })];
                    case 2:
                        response = _e.sent();
                        expect(response.status).toBe(400);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should fail for addition of an already added product', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _b = (_a = request
                            .post('/orders/1'))
                            .set;
                        _c = ['Authorization'];
                        _d = 'Bearer ';
                        return [4 /*yield*/, token.importToken()];
                    case 1: return [4 /*yield*/, _b.apply(_a, _c.concat([_d + (_e.sent())]))
                            .send({ products: [{ product_id: 2, quantity: 2 }] })];
                    case 2:
                        response = _e.sent();
                        expect(response.status).toBe(400);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should successfully add a product to the order', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _b = (_a = request
                            .post('/orders/1'))
                            .set;
                        _c = ['Authorization'];
                        _d = 'Bearer ';
                        return [4 /*yield*/, token.importToken()];
                    case 1: return [4 /*yield*/, _b.apply(_a, _c.concat([_d + (_e.sent())]))
                            .send({ products: [{ product_id: 3, quantity: 1 }] })];
                    case 2:
                        response = _e.sent();
                        expect(response.status).toBe(200);
                        expect(response.body).toEqual({
                            order_id: 1,
                            products: [
                                {
                                    id: 2,
                                    name: 'Product2',
                                    price: 750,
                                    category: 'category1',
                                    quantity: 2,
                                },
                                {
                                    id: 3,
                                    name: 'Product3',
                                    price: 1000,
                                    category: 'category2',
                                    quantity: 1,
                                },
                            ],
                        });
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('Testing Finish Order Endpoint', function () {
        it('should fail for requiring the Authorization Token', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request.get('/orders/1/finish')];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(401);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should fail because there is no order with id of 3', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _b = (_a = request
                            .get('/orders/3/finish'))
                            .set;
                        _c = ['Authorization'];
                        _d = 'Bearer ';
                        return [4 /*yield*/, token.importToken()];
                    case 1: return [4 /*yield*/, _b.apply(_a, _c.concat([_d + (_e.sent())]))];
                    case 2:
                        response = _e.sent();
                        expect(response.status).toBe(404);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should successfully finish the order of id 1', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _b = (_a = request
                            .get('/orders/1/finish'))
                            .set;
                        _c = ['Authorization'];
                        _d = 'Bearer ';
                        return [4 /*yield*/, token.importToken()];
                    case 1: return [4 /*yield*/, _b.apply(_a, _c.concat([_d + (_e.sent())]))];
                    case 2:
                        response = _e.sent();
                        expect(response.status).toBe(200);
                        expect(response.body).toEqual({
                            order_id: 1,
                            products: [
                                {
                                    id: 2,
                                    name: 'Product2',
                                    price: 750,
                                    category: 'category1',
                                    quantity: 2,
                                },
                                {
                                    id: 3,
                                    name: 'Product3',
                                    price: 1000,
                                    category: 'category2',
                                    quantity: 1,
                                },
                            ],
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it('should be forbidden since the order is already complete', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _b = (_a = request
                            .get('/orders/1/finish'))
                            .set;
                        _c = ['Authorization'];
                        _d = 'Bearer ';
                        return [4 /*yield*/, token.importToken()];
                    case 1: return [4 /*yield*/, _b.apply(_a, _c.concat([_d + (_e.sent())]))];
                    case 2:
                        response = _e.sent();
                        expect(response.status).toBe(403);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('Testing Show Certain Order Endpoint', function () {
        it('should fail for requiring the Authorization Token', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request.get('/orders/1')];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(401);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should fail because there is no order with id of 3', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _b = (_a = request
                            .get('/orders/3'))
                            .set;
                        _c = ['Authorization'];
                        _d = 'Bearer ';
                        return [4 /*yield*/, token.importToken()];
                    case 1: return [4 /*yield*/, _b.apply(_a, _c.concat([_d + (_e.sent())]))];
                    case 2:
                        response = _e.sent();
                        expect(response.status).toBe(404);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should successfully show the order of id 1', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _b = (_a = request
                            .get('/orders/1'))
                            .set;
                        _c = ['Authorization'];
                        _d = 'Bearer ';
                        return [4 /*yield*/, token.importToken()];
                    case 1: return [4 /*yield*/, _b.apply(_a, _c.concat([_d + (_e.sent())]))];
                    case 2:
                        response = _e.sent();
                        expect(response.status).toBe(200);
                        expect(response.body).toEqual({
                            order_id: 1,
                            status: 'complete',
                            products: [
                                {
                                    id: 2,
                                    name: 'Product2',
                                    price: 750,
                                    category: 'category1',
                                    quantity: 2,
                                },
                                {
                                    id: 3,
                                    name: 'Product3',
                                    price: 1000,
                                    category: 'category2',
                                    quantity: 1,
                                },
                            ],
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it('should successfully show the order of id 2', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _b = (_a = request
                            .get('/orders/2'))
                            .set;
                        _c = ['Authorization'];
                        _d = 'Bearer ';
                        return [4 /*yield*/, token.importToken()];
                    case 1: return [4 /*yield*/, _b.apply(_a, _c.concat([_d + (_e.sent())]))];
                    case 2:
                        response = _e.sent();
                        expect(response.status).toBe(200);
                        expect(response.body).toEqual({
                            order_id: 2,
                            status: 'active',
                            products: [
                                {
                                    id: 1,
                                    name: 'Product1',
                                    price: 500,
                                    category: 'category1',
                                    quantity: 3,
                                },
                            ],
                        });
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('Testing Show Active Orders Endpoint', function () {
        it('should fail for requiring the Authorization Token', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request.get('/orders/active')];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(401);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should successfully show the active orders of the user', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _b = (_a = request
                            .get('/orders/active'))
                            .set;
                        _c = ['Authorization'];
                        _d = 'Bearer ';
                        return [4 /*yield*/, token.importToken()];
                    case 1: return [4 /*yield*/, _b.apply(_a, _c.concat([_d + (_e.sent())]))];
                    case 2:
                        response = _e.sent();
                        expect(response.status).toBe(200);
                        expect(response.body).toEqual([{ id: 2 }]);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('Testing Show Complete Orders Endpoint', function () {
        it('should fail for requiring the Authorization Token', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request.get('/orders/complete')];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(401);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should successfully show the complete orders of the user', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _b = (_a = request
                            .get('/orders/complete'))
                            .set;
                        _c = ['Authorization'];
                        _d = 'Bearer ';
                        return [4 /*yield*/, token.importToken()];
                    case 1: return [4 /*yield*/, _b.apply(_a, _c.concat([_d + (_e.sent())]))];
                    case 2:
                        response = _e.sent();
                        expect(response.status).toBe(200);
                        expect(response.body).toEqual([{ id: 1 }]);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    afterAll(function () {
        token.deleteToken();
        (0, dropDb_1.default)();
    });
});