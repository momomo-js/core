"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mo_application_class_1 = require("./mo-application.class");
require("reflect-metadata");
const mo_plugin_1 = require("../decorator/mo-plugin");
class MoBasicServer extends mo_application_class_1.MoApplication {
    pause() {
    }
    stop() {
    }
    restart() {
    }
    getPlugin(pack, name) {
        for (let a in pack) {
            let str = Reflect.getMetadata(mo_plugin_1.PLUGINS, pack[a]);
            if (str === name) {
                return pack[a];
            }
        }
        return null;
    }
}
exports.MoBasicServer = MoBasicServer;
//# sourceMappingURL=mo-server.class.js.map