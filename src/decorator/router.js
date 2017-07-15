"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const symbol_1 = require("./symbol");
function Router(options) {
    return (target) => {
        if (options) {
            if (options.controllers) {
                Reflect.defineMetadata(symbol_1.CONTROLLER_LIST, options.controllers, target);
            }
            if (options.services) {
                Reflect.defineMetadata(symbol_1.SERVICE_LIST, options.services, target);
            }
        }
    };
}
exports.Router = Router;
//# sourceMappingURL=router.js.map