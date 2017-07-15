"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const debug = require("debug");
const mo_application_class_1 = require("../define/mo-application.class");
const server_manager_1 = require("./server-manager");
const router_manager_1 = require("./router-manager");
const injection_js_1 = require("injection-js");
class MoServer extends mo_application_class_1.MoApplication {
    constructor(instance = 'instance', port = 3000) {
        super();
        this.serverList = [];
        this.moduleList = [];
        this.pluginList = [];
        this.moServer = this;
        this.instance = instance;
        this.debug = debug(instance + ':MoServer');
        this.context = null;
        this.serverManager = this.loadMoApplication(new server_manager_1.ServerManager());
        this.routerManager = this.loadMoApplication(new router_manager_1.RouterManager());
        this.serverManager.port = port;
        this.instanceName = instance;
        this._injector = injection_js_1.ReflectiveInjector.resolveAndCreate([
            { provide: MoServer, useValue: this }
        ]);
    }
    set state(state) {
        this._state = state;
    }
    startSever() {
        this.debug('starting MoBasicServer');
        for (let module of this.moduleList) {
            module = module;
            module.init();
        }
        this.initPlugin();
        this.routerManager.init();
        for (let server of this.serverList) {
            let sIns = server;
            sIns.init();
        }
        this.serverManager.init();
        for (let module of this.moduleList) {
            module = module;
            module.start();
        }
        for (let server of this.serverList) {
            let sIns = server;
            sIns.start();
        }
        this.serverManager.start();
    }
    addServer(server) {
        if (server) {
            let sIns = this.loadMoApplication(server);
            this.serverList.push(sIns);
        }
    }
    addModule(module) {
        if (module) {
            let mIns = this.loadMoApplication(module);
            this.moduleList.push(mIns);
        }
    }
    initPlugin() {
        for (let s of this.serverList) {
            s = s;
            for (let p of this.pluginList) {
                s.addPlugin(p);
            }
        }
    }
    addPlugin(plugins) {
        for (let plugin of plugins) {
            let pIns = this._injector.resolveAndInstantiate(plugin);
            if (pIns)
                this.pluginList.push(pIns);
        }
    }
}
exports.MoServer = MoServer;
//# sourceMappingURL=moserver.js.map