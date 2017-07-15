import "reflect-metadata";
import * as debug from "debug";
import {MoApplication} from "../define/mo-application.class";
import {ServerManager} from "./server-manager";
import {State} from "../define/state.enum";
import {MoBasicServer} from "../define/mo-server.class";
import {RouterManager} from "./router-manager";
import {Module} from "../define/module.class";
/**
 * 创建MoCreate实例
 */
export class MoServer extends MoApplication {

    serverManager: ServerManager;
    routerManager: RouterManager;

    instanceName: string;

    serverList: MoBasicServer[] = [];
    moduleList: Module[] = [];

    /**
     *
     * @param instance 实例名称
     * @param port 服务端口号
     */
    constructor(instance: string = 'instance', port: number = 3000) {
        super();
        this.moServer = this;
        this.instance = instance;
        this.debug = debug(instance + ':MoServer');
        this.context = null;
        this.serverManager = this.loadMoApplication(new ServerManager());
        this.routerManager = this.loadMoApplication(new RouterManager());
        this.serverManager.port = port;
        this.instanceName = instance;
    }

    set state(state: State) {
        this._state = state;
    }


    /**
     * 开始加载服务器
     * 并设置状态
     */
    startSever() {
        this.debug('starting MoBasicServer');

        for (let module of this.moduleList) {
            module = module as MoBasicServer;
            module.init();
        }

        this.routerManager.init();

        for (let server of this.serverList) {
            let sIns = server as MoBasicServer;
            sIns.init();
        }

        this.serverManager.init();

        for (let module of this.moduleList) {
            module = module as MoBasicServer;
            module.start();
        }

        for (let server of this.serverList) {
            let sIns = server as MoBasicServer;
            sIns.start();
        }
        this.serverManager.start();
    }

    addServer<T extends MoBasicServer>(server: T): void {
        if (server) {
            let sIns = this.loadMoApplication(server);
            this.serverList.push(sIns);
        }
    }

    addModule<T extends Module>(module: T) {
        if (module) {
            let mIns = this.loadMoApplication(module);
            this.moduleList.push(mIns);
        }
    }
}


/**
 * Created by yskun on 2017/5/15.
 * MoProject COPYRIGHT
 */
