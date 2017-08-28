import 'reflect-metadata';
import {ServerManager} from './server-manager';
import {MoBasicServer} from '../define/mo-server.class';
import {RouterManager} from './router-manager';
import {Module} from '../define/module.class';
import {ReflectiveInjector} from 'injection-js';
import {Mo} from '../define/mo.class';
import {MoCycleLife} from '../define/mo-cycle-life.interface';
import {MoInstance} from '../define/mo-instance.class';
import {MoServerToken} from '../decorator/symbol';

/**
 * 创建MoCreate实例
 */
export class MoServer extends Mo implements MoCycleLife {
    serverManager: ServerManager;
    routerManager: RouterManager;
    moInstance: MoInstance;
    instanceName: string;
    serverList: MoBasicServer[] = [];
    moduleList: Module[] = [];
    _injector: ReflectiveInjector;
    pluginList: any[] = [];

    /**
     *
     * @param instance 网站实例
     */
    constructor(instance: MoInstance) {
        super();
        this.initInjector(instance);
        this.instanceName = this.moInstance.instance;
        this.serverManager.port = this.moInstance.port;
        this.serverManager.host = this.moInstance.host;
        this.bindExitProcess();
    }

    async onInit() {
        await this.moInstance.onInit();

        await this.routerManager.onInit();

        for (const server of this.serverList) {
            await server.onInit();
        }

        await this.serverManager.onInit();
    }

    async onStart() {
        await this.moInstance.onStart();

        await this.routerManager.onStart();

        for (const server of this.serverList) {
            await server.onStart();
        }

        await this.serverManager.onStart();
    }

    async onStop() {
        await this.moInstance.onStop();

        await this.routerManager.onStop();

        for (const server of this.serverList) {
            await server.onStop();
        }

        await this.serverManager.onStop();
    }

    async onExit() {
        await this.moInstance.onExit();
    }

    /**
     * 开始加载服务器
     * 并设置状态
     */
    async startSever() {
        this.debug('starting MoBasicServer');
        await this.onInit();
        await this.onStart();
    }

    /**
     * @deprecated
     * @param {MoBasicServer} server
     */
    addServer(server: MoBasicServer): void {
        if (server) {
            const sIns = this.loadMoApplication(server);
            this.serverList.push(sIns);
        }
    }

    /**
     * @deprecated
     * @param {Module} module
     */
    addModule(module: Module): void {
        if (module) {
            const mIns = this.loadMoApplication(module);
            this.moduleList.push(mIns);
        }
    }

    /**
     * @deprecated
     * @param {any[]} plugins
     */
    addPlugin(plugins: any[]) {
        for (const plugin of plugins) {
            const pIns = this._injector.resolveAndInstantiate(plugin);
            if (pIns) {
                this.pluginList.push(pIns);
            }
        }
    }

    /**
     * @deprecated
     * @param {T} moApplication
     * @returns {T}
     */
    protected loadMoApplication<T extends Mo>(moApplication: T): T {
        moApplication['moServer'] = this;
        moApplication['context'] = this;
        return moApplication;
    }

    private initInjector(instance: any) {
        this._injector = ReflectiveInjector.resolveAndCreate(
            [
                {provide: MoServerToken, useValue: this},
                ServerManager,
                RouterManager,
                instance
            ]);

        this.moInstance = this._injector.get(instance);
        this.serverManager = this._injector.get(ServerManager);
        this.routerManager = this._injector.get(RouterManager);
    }

    /**
     * 绑定结束进程
     */
    private bindExitProcess() {
        process.on('SIGINT', () => {
            this.onStop().then(() => {
                this.onExit().then(() => {
                    process.exit(0);
                });
            });
        });
    }

    /**
     * @deprecated
     */
    private initPlugin() {
        for (const p of this.pluginList) {
            for (let s of this.serverList) {
                s = s as MoBasicServer;
                s.addPlugin(p);
            }
        }
    }
}


/**
 * Created by yskun on 2017/5/15.
 * MoProject COPYRIGHT
 */
