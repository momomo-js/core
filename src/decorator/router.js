"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Router(options) {
    return (target) => {
        let original = target;
        function construct(constructor, args) {
            let c = function () {
                let cIns = new constructor(...args);
                cIns.controllers = [];
                if (options) {
                    if (options.controllers) {
                        for (let controller of options.controllers) {
                            let controllerIns = new controller;
                            cIns.controllers.push(controllerIns);
                        }
                    }
                }
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
exports.Router = Router;
//# sourceMappingURL=router.js.map