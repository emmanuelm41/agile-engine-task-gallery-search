"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemJS = void 0;
var memjs_1 = __importDefault(require("memjs"));
var memjs_2 = __importDefault(require("../../config/memjs"));
process.env.MEMCACHIER_SERVERS = memjs_2.default.host + ":" + memjs_2.default.port;
var MemJS = /** @class */ (function () {
    function MemJS() {
    }
    MemJS.getInstance = function () {
        return this.instance;
    };
    MemJS.instance = memjs_1.default.Client.create();
    return MemJS;
}());
exports.MemJS = MemJS;
