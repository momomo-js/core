"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Controller(options) {
    return (target) => {
        let original = target;
        function construct(constructor, args) {
            let c = function () {
                let cIns = constructor.apply(this, args);
                cIns.modelList = new Map();
                let path = null;
                if (options) {
                    if (!options.path) {
                        let cInsName = cIns.constructor.name;
                        path = cInsName.replace("Controller", "").toLowerCase();
                    }
                    else {
                        path = options.path;
                    }
                    if (options.models) {
                        for (let model of options.models) {
                            cIns.modelList.set(model.constructor.name, new model());
                        }
                        Reflect.defineMetadata("modelList", options.models, target);
                    }
                }
                else {
                    let cInsName = cIns.constructor.name;
                    path = cInsName.replace("Controller", "").toLowerCase();
                }
                Reflect.defineMetadata("path", path, target);
                return cIns;
            };
            c.prototype = constructor.prototype;
            return new c();
        }
        let f = function (...args) {
            return construct(original, args);
        };
        f.prototype = original.prototype;
        return f;
    };
}
exports.Controller = Controller;
//# sourceMappingURL=controller.js.map