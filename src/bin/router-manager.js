"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mo_application_class_1 = require("../define/mo-application.class");
class RouterManager extends mo_application_class_1.MoApplication {
    constructor() {
        super();
        this.routerList = [];
    }
    addRouter(router) {
        let rIns = new router();
        for (let r of this.routerList) {
            if (r.constructor.name == rIns.constructor.name) {
                return;
            }
        }
        this.routerList.push(rIns);
        this._controllerList.push(...rIns.controllers);
    }
    delRouter(router) {
        for (let i = 0; i < this.routerList.length; i++) {
            if (this.routerList[i].constructor.name == router.constructor.name) {
                this.routerList.splice(i, i);
                return;
            }
        }
        this.refreshControllerList();
    }
    refreshControllerList() {
        this._controllerList = [];
        for (let r of this.routerList) {
            let router = r;
            this._controllerList.push(...router.controllers);
        }
    }
    get controllerList() {
        return this._controllerList;
    }
}
exports.RouterManager = RouterManager;
//# sourceMappingURL=router-manager.js.map