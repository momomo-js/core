"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const debug = require("debug");
const mo_application_class_1 = require("../define/mo-application.class");
const server_manager_1 = require("./server-manager");
const router_manager_1 = require("./router-manager");
class MoServer extends mo_application_class_1.MoApplication {
    constructor(instance = 'instance', port = 3000) {
        super();
        this.serverList = [];
        this.moServer = this;
        this.instance = instance;
        this.debug = debug(instance + ':MoServer');
        this.context = null;
        this.serverManager = this.loadMoApplication(new server_manager_1.ServerManager());
        this.routerManager = this.loadMoApplication(new router_manager_1.RouterManager());
        this.serverManager.port = port;
        this.instanceName = instance;
    }
    set state(state) {
        this._state = state;
    }
    startSever() {
        this.debug('starting MoBasicServer');
        for (let server of this.serverList) {
            let sIns = server;
            sIns.init();
        }
        this.serverManager.init();
        for (let server of this.serverList) {
            let sIns = server;
            sIns.start();
        }
        this.serverManager.start();
    }
    addServer(server) {
        let sIns = this.loadMoApplication(server);
        if (server)
            this.serverList.push(sIns);
    }
}
exports.MoServer = MoServer;
//# sourceMappingURL=moserver.js.map