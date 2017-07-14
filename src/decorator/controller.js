"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const symbol_1 = require("./symbol");
function Controller(options) {
    return (target) => {
        let original = target;
        function construct(constructor, args) {
            let c = function () {
                let cIns = new constructor(...args);
                cIns.modelList = new Map();
                return cIns;
            };
            c.prototype = constructor.prototype;
            let cIns = new c();
            let path = null;
            if (options) {
                if (!options.path) {
                    let cInsName = cIns.constructor.name;
                    path = '/' + cInsName.replace("Controller", "").toLowerCase();
                }
                else {
                    path = options.path;
                }
                if (options.models) {
                    for (let model of options.models) {
                        cIns.modelList.set(model.name, new model());
                    }
                    Reflect.defineMetadata(symbol_1.MODELLIST, options.models, cIns);
                }
            }
            else {
                let cInsName = cIns.constructor.name;
                path = cInsName.replace("Controller", "").toLowerCase();
            }
            Reflect.defineMetadata(symbol_1.PATH, path, cIns);
            return cIns;
        }
        let f = function (...args) {
            return construct(original, args);
        };
        f.prototype = original.prototype;
        let param = Reflect.getMetadata("design:paramtypes", original);
        Reflect.defineMetadata("design:paramtypes", param, f);
        return f;
    };
}
exports.Controller = Controller;
//# sourceMappingURL=controller.js.map