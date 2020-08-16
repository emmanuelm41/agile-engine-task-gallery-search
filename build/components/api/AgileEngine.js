"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgileEngine = void 0;
var axios_1 = __importDefault(require("axios"));
var api_1 = __importDefault(require("../../config/api"));
var AgileEngine = /** @class */ (function () {
    function AgileEngine() {
    }
    AgileEngine.getInstance = function () {
        if (!this.instance)
            this.instance = axios_1.default.create({
                baseURL: api_1.default.baseURL
            });
        return this.instance;
    };
    return AgileEngine;
}());
exports.AgileEngine = AgileEngine;
