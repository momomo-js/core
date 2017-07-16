"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mo_application_class_1 = require("../define/mo-application.class");
const injection_js_1 = require("injection-js");
const symbol_1 = require("../decorator/symbol");
class RouterManager extends mo_application_class_1.MoApplication {
    constructor() {
        super(...arguments);
        this._routerList = [];
        this._serviceList = [];
    }
    addRouter(routerList) {
        for (let router of routerList) {
            let rIns = new router();
            for (let r of this._routerList) {
                if (r.constructor.name == rIns.constructor.name) {
                    return;
                }
            }
            this._routerList.push(rIns);
        }
    }
    delRouter(router) {
        for (let i = 0; i < this._routerList.length; i++) {
            if (this._routerList[i].constructor.name == router.constructor.name) {
                this._routerList.splice(i, i);
                return;
            }
        }
    }
    get controllerList() {
        let controller_List = [];
        for (let r of this._routerList) {
            r = r;
            for (let c of r.controllers) {
                controller_List.push(c.pop());
            }
        }
        return controller_List;
    }
    addService(service) {
        this._serviceList.push(...service);
    }
    init() {
        this._injector = injection_js_1.ReflectiveInjector.resolveAndCreate(this._serviceList);
        for (let r of this._routerList) {
            r = r;
            let controller_list = Reflect.getMetadata(symbol_1.CONTROLLER_LIST, r.constructor);
            let service_list = Reflect.getMetadata(symbol_1.SERVICE_LIST, r.constructor);
            let provider = [];
            if (service_list)
                provider.push(...service_list);
            if (controller_list)
                provider.push(...controller_list);
            r._injector = injection_js_1.ReflectiveInjector.resolveAndCreate(provider, this._injector);
            r.controllers = new Map();
            r.services = new Map();
            if (service_list)
                for (let s of service_list) {
                    let sIns = r._injector.get(s);
                    r.services.set(s, sIns);
                }
            if (controller_list)
                for (let c of controller_list) {
                    let cIns = r._injector.get(c);
                    cIns.router = r;
                    r.controllers.set(c, cIns);
                }
        }
    }
}
exports.RouterManager = RouterManager;
//# sourceMappingURL=router-manager.js.map