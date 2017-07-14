"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PLUGINS = Symbol("plugins");
function Plugin(name) {
    return function (target, propertyKey) {
        Reflect.defineMetadata(exports.PLUGINS, name, target, propertyKey);
        let pluginList = Reflect.getMetadata(exports.PLUGINS, target);
        if (!pluginList) {
            pluginList = [];
            Reflect.defineMetadata(exports.PLUGINS, pluginList, target);
        }
        pluginList.push(propertyKey);
    };
}
exports.Plugin = Plugin;
//# sourceMappingURL=plugin.js.map