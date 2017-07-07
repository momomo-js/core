import * as debug from "debug";
import {MoApplication} from "../define/mo-application.class";
import {ServerManager} from "./server-manager";
import {State} from "../define/state.enum";
import {MoBasicServer} from "../define/mo-server.class";
import "reflect-metadata";
import {RouterManager} from "./router-manager";
/**
 * 创建MoCreate实例
 */
export class MoServer extends MoApplication {

    serverManager: ServerManager;
    routerManager: RouterManager;

    instanceName: string;

    serverList: MoBasicServer[] = [];

    /**
     *
     * @param instance 实例名称
     * @param port 服务端口号
     */
    constructor(instance: string = 'instance', port: number = 3000) {
        super();
        this.moServer = this;
        this.debug = debug(instance + ':MoBasicServer');
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
        for (let server of this.serverList) {
            let sIns = server as MoBasicServer;
            sIns.init();
        }
        this.serverManager.init();
        for (let server of this.serverList) {
            let sIns = server as MoBasicServer;
            sIns.start();
        }
        this.serverManager.start();
    }

    addServer<T extends MoBasicServer>(server: T): void {
        if (server)
            this.serverList.push(server);
    }

}


/**
 * Created by yskun on 2017/5/15.
 */
