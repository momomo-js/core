"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const symbol_1 = require("./symbol");
function Method(method, path) {
    return function (target, propertyKey, descriptor) {
        let ControllerMethod = Reflect.getMetadata(symbol_1.CONTROLLER, target);
        if (!ControllerMethod) {
            ControllerMethod = [];
            Reflect.defineMetadata(symbol_1.CONTROLLER, ControllerMethod, target);
        }
        ControllerMethod.push(target[propertyKey]);
        Reflect.defineMetadata(symbol_1.METHOD, method, target, propertyKey);
        let q = Reflect.getMetadata("design:paramtypes", target, propertyKey);
        let s = q.map(o => o.name);
        Reflect.defineMetadata(symbol_1.PARAMS, s, target, propertyKey);
        if (!path)
            path = '/' + propertyKey;
        Reflect.defineMetadata(symbol_1.PATH, path, target, propertyKey);
    };
}
exports.Method = Method;
//# sourceMappingURL=method.js.map