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
var resetDb_1 = __importDefault(require("../assets/resetDb"));
var token = new TokenStore_1.default();
var request = (0, supertest_1.default)(server_1.default);
describe('Testing Users Endpoints', function () {
    beforeAll(function () {
        console.log('Resetting Database.............\n');
        (0, resetDb_1.default)();
    });
    describe('Testing the Create Endpoint', function () {
        it('should create the user successfully', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request.post('/users').send({
                            firstname: 'User1',
                            lastname: 'Biden',
                            password: 'qwerty123',
                        })];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(200);
                        expect(response.body.id).toBe(1);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should fail for requiring the firstname', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request
                            .post('/users')
                            .send({ lastname: 'Biden', password: 'asdfgh456' })];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(400);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should fail for requiring the lastname', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request
                            .post('/users')
                            .send({ firstname: 'User2', password: 'asdfgh456' })];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(400);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should fail for requiring the password', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request
                            .post('/users')
                            .send({ firstname: 'User2', lastname: 'Biden' })];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(400);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should fail for requiring a password with 6 characters at least', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request.post('/users').send({
                            firstname: 'User2',
                            lastname: 'Biden',
                            password: 'asdf',
                        })];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(400);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should create another user successfully', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request.post('/users').send({
                            firstname: 'User2',
                            lastname: 'Biden',
                            password: 'asdfgh456',
                        })];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(200);
                        expect(response.body.id).toBe(2);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should create a third user successfully', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request.post('/users').send({
                            firstname: 'User3',
                            lastname: 'Biden',
                            password: 'zxcvbn789',
                        })];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(200);
                        expect(response.body.id).toBe(3);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('Testing the Authentication Endpoint', function () {
        it('should fail to authenticate for requiring the firstname', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request
                            .post('/users/auth')
                            .send({ lastname: 'Biden', password: 'asdfgh456' })];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(400);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should fail to authenticate for requiring the lastname', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request
                            .post('/users/auth')
                            .send({ firstname: 'User2', password: 'asdfgh456' })];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(400);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should fail to authenticate for requiring the password', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request
                            .post('/users/auth')
                            .send({ firstname: 'User2', lastname: 'Biden' })];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(400);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should fail to authenticate for wrong username', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request.post('/users/auth').send({
                            firstname: 'Bla',
                            lastname: 'bla',
                            password: 'qwerty',
                        })];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(401);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should fail to authenticate for wrong password', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request.post('/users/auth').send({
                            firstname: 'User2',
                            lastname: 'Biden',
                            password: 'qwerty',
                        })];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(401);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should authenticate successfully', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request.post('/users/auth').send({
                            firstname: 'User1',
                            lastname: 'Biden',
                            password: 'qwerty123',
                        })];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(200);
                        expect(response.body.id).toBe(1);
                        token.exportToken(response.body.token);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('Testing the Index (Show All Users) Endpoint', function () {
        it('should fail because Authorization Token is required', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request.get('/users')];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(401);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should fail because Authorization Token is invalid', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request
                            .get('/users')
                            .set('Authorization', 'Bearer ' + 'Blabla')];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(401);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should show all the users successfully', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _b = (_a = request
                            .get('/users'))
                            .set;
                        _c = ['Authorization'];
                        _d = 'Bearer ';
                        return [4 /*yield*/, token.importToken()];
                    case 1: return [4 /*yield*/, _b.apply(_a, _c.concat([_d + (_e.sent())]))];
                    case 2:
                        response = _e.sent();
                        expect(response.status).toBe(200);
                        expect(response.body).toEqual([
                            {
                                id: 1,
                                firstname: 'User1',
                                lastname: 'Biden',
                            },
                            {
                                id: 2,
                                firstname: 'User2',
                                lastname: 'Biden',
                            },
                            {
                                id: 3,
                                firstname: 'User3',
                                lastname: 'Biden',
                            },
                        ]);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('Testing the Show Certain User Endpoint', function () {
        it('should fail because Authorization Token is required', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request.get('/users/2')];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(401);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should fail because Authorization Token is invalid', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request
                            .get('/users/2')
                            .set('Authorization', 'Bearer ' + 'Blabla')];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(401);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should show the user of id 2 successfully', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _b = (_a = request
                            .get('/users/2'))
                            .set;
                        _c = ['Authorization'];
                        _d = 'Bearer ';
                        return [4 /*yield*/, token.importToken()];
                    case 1: return [4 /*yield*/, _b.apply(_a, _c.concat([_d + (_e.sent())]))];
                    case 2:
                        response = _e.sent();
                        expect(response.status).toBe(200);
                        expect(response.body).toEqual({
                            firstname: 'User2',
                            lastname: 'Biden',
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it('should show the user of id 3 successfully', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _b = (_a = request
                            .get('/users/3'))
                            .set;
                        _c = ['Authorization'];
                        _d = 'Bearer ';
                        return [4 /*yield*/, token.importToken()];
                    case 1: return [4 /*yield*/, _b.apply(_a, _c.concat([_d + (_e.sent())]))];
                    case 2:
                        response = _e.sent();
                        expect(response.status).toBe(200);
                        expect(response.body).toEqual({
                            firstname: 'User3',
                            lastname: 'Biden',
                        });
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
