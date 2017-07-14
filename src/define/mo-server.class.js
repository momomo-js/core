"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mo_application_class_1 = require("./mo-application.class");
const plugin_1 = require("../decorator/plugin");
class MoBasicServer extends mo_application_class_1.MoApplication {
    pause() {
    }
    stop() {
    }
    restart() {
    }
    static getPlugin(pack, type) {
        let pluginList = Reflect.getMetadata(plugin_1.PLUGINS, pack);
        let ret = [];
        for (let p of pluginList) {
            let Type = Reflect.getMetadata(plugin_1.PLUGINS, pack, p);
            if (Type == type) {
                ret.push(pack[p]);
            }
        }
        return ret;
    }
}
exports.MoBasicServer = MoBasicServer;
//# sourceMappingURL=mo-server.class.js.map