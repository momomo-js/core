"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mo_class_1 = require("./mo.class");
class MoApplication extends mo_class_1.Mo {
    constructor() {
        super();
        this.context = null;
        this.moServer = null;
    }
    loadMoApplication(moApplication) {
        moApplication.moServer = this.moServer;
        moApplication.context = this;
        moApplication.debug = this.moServer.debug;
        return moApplication;
    }
    get state() {
        return this._state;
    }
}
exports.MoApplication = MoApplication;
//# sourceMappingURL=mo-application.class.js.map