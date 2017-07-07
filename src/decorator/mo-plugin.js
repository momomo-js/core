"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
exports.PLUGINS = Symbol("plugins");
function MoPlugin(name) {
    return Reflect.metadata(exports.PLUGINS, name);
}
exports.MoPlugin = MoPlugin;
//# sourceMappingURL=mo-plugin.js.map