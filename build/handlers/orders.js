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
var express_1 = __importDefault(require("express"));
var verifyAuthToken_1 = __importDefault(require("../middleware/verifyAuthToken"));
var dashboard_1 = require("../models/dashboard");
var order_1 = require("../models/order");
var router = express_1.default.Router();
var store = new order_1.OrderStore();
var dash = new dashboard_1.Dashboard();
var createOrder = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var order, _i, _a, product, orderDetails;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, store.create({
                    user_id: parseInt(req.params.tokenUserID),
                    status: 'active',
                })];
            case 1:
                order = _c.sent();
                _i = 0, _a = req.body.products;
                _c.label = 2;
            case 2:
                if (!(_i < _a.length)) return [3 /*break*/, 5];
                product = _a[_i];
                product.order_id = order.id;
                return [4 /*yield*/, store.addProduct(product)];
            case 3:
                _c.sent();
                _c.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 2];
            case 5:
                _b = {
                    order_id: order.id
                };
                return [4 /*yield*/, dash.readOrderProducts(order.id)];
            case 6:
                orderDetails = (_b.products = _c.sent(),
                    _b);
                res.json(orderDetails);
                return [2 /*return*/];
        }
    });
}); };
var addProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var order, _i, _a, product, orderDetails, err_1;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 7, , 8]);
                return [4 /*yield*/, store.read('*', { id: parseInt(req.params.order_id) })];
            case 1:
                order = (_c.sent())[0];
                if (!order) {
                    res.json("An order with this ID does not exist.");
                    return [2 /*return*/];
                }
                if (order.user_id !== parseInt(req.params.tokenUserID)) {
                    res.json("Can not modify this order. This order does not belong to this user.");
                    return [2 /*return*/];
                }
                if (order.status === 'complete') {
                    res.json("Can not add products to this order. This order is already complete.");
                    return [2 /*return*/];
                }
                _i = 0, _a = req.body.products;
                _c.label = 2;
            case 2:
                if (!(_i < _a.length)) return [3 /*break*/, 5];
                product = _a[_i];
                product.order_id = order.id;
                return [4 /*yield*/, store.addProduct(product)];
            case 3:
                _c.sent();
                _c.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 2];
            case 5:
                _b = {
                    order_id: order.id
                };
                return [4 /*yield*/, dash.readOrderProducts(order.id)];
            case 6:
                orderDetails = (_b.products = _c.sent(),
                    _b);
                res.json(orderDetails);
                return [3 /*break*/, 8];
            case 7:
                err_1 = _c.sent();
                res.json('A product you requested to add was already found in your order. Please check your order first before adding more products.');
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
var showOrder = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var order, orderDetails;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, store.read('*', { id: parseInt(req.params.order_id) })];
            case 1:
                order = (_b.sent())[0];
                if (!order) {
                    res.json("An order with this ID does not exist.");
                    return [2 /*return*/];
                }
                if (order.user_id !== parseInt(req.params.tokenUserID)) {
                    res.json("Can not show this order. This order does not belong to this user.");
                    return [2 /*return*/];
                }
                _a = {
                    order_id: order.id,
                    status: order.status
                };
                return [4 /*yield*/, dash.readOrderProducts(order.id)];
            case 2:
                orderDetails = (_a.products = _b.sent(),
                    _a);
                res.json(orderDetails);
                return [2 /*return*/];
        }
    });
}); };
var finish = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var order, orderDetails;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, store.read('*', { id: parseInt(req.params.order_id) })];
            case 1:
                order = (_b.sent())[0];
                if (!order) {
                    res.json("An order with this ID does not exist.");
                    return [2 /*return*/];
                }
                if (order.user_id !== parseInt(req.params.tokenUserID)) {
                    res.json("Can not modify this order. This order does not belong to this user.");
                    return [2 /*return*/];
                }
                if (order.status === 'complete') {
                    res.json("Order is already finished.");
                    return [2 /*return*/];
                }
                return [4 /*yield*/, store.update({ status: 'complete' }, { id: parseInt(req.params.order_id) })];
            case 2:
                order = (_b.sent())[0];
                _a = {
                    order_id: order.id
                };
                return [4 /*yield*/, dash.readOrderProducts(order.id)];
            case 3:
                orderDetails = (_a.products = _b.sent(),
                    _a);
                res.json(orderDetails);
                return [2 /*return*/];
        }
    });
}); };
var active = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var orders;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, store.read('*', { status: 'active' })];
            case 1:
                orders = _a.sent();
                res.json(orders);
                return [2 /*return*/];
        }
    });
}); };
var complete = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var orders;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, store.read('*', { status: 'complete' })];
            case 1:
                orders = _a.sent();
                res.json(orders);
                return [2 /*return*/];
        }
    });
}); };
router.get('/active', verifyAuthToken_1.default, active);
router.get('/complete', verifyAuthToken_1.default, complete);
router.get('/:order_id', verifyAuthToken_1.default, showOrder);
router.get('/:order_id/finish', verifyAuthToken_1.default, finish);
router.post('/create', verifyAuthToken_1.default, createOrder);
router.post('/:order_id', verifyAuthToken_1.default, addProduct);
exports.default = router;
