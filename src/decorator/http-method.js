"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const symbol_1 = require("./symbol");
function Method(method) {
    return function (target, propertyKey, descriptor) {
        Reflect.defineMetadata(symbol_1.METHOD, method, target, propertyKey);
    };
}
exports.Method = Method;
//# sourceMappingURL=http-method.js.map