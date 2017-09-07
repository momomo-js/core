import 'reflect-metadata';
import {ServerManager} from './server-manager';
import {MoBasicServer} from '../define/mo-server.class';
import {RouterManager} from './router-manager';
import {Component} from '../define/component.class';
import {ReflectiveInjector} from 'injection-js';
import {Mo} from '../define/mo.class';
import {MoApplicationCycleLife} from '../define/mo-cycle-life.interface';
import {INSTANCE, MODULE, MoServerToken, SERVER, TARGET} from '../decorator/symbol';
import {InstanceOptions} from '../define/instance-options.interface';
import {ModuleOptions} from '../define/module-options.interface';
import {ServerOptions} from '../define/server-options';

/**
 * 创建MoServer实例
 */
export class MoServer extends Mo {
    serverManager: ServerManager;
    routerManager: RouterManager;
    moduleList: Set<any> = new Set();
    componentList: Component[] = [];
    serverList: Map<any, MoBasicServer> = new Map();
    pluginPackageList: Map<any, any> = new Map();
    _injector: ReflectiveInjector;
    private serverCycleLife: MoApplicationCycleLife[] = [];

    /**
     * 创建实例
     * 单一Node进程中应只包含单一 Instance
     * @param instance 应用实例
     * @returns {Promise<MoServer>}
     */
    static async create(instance: any): Promise<MoServer> {
        const ins = new MoServer(instance);
        await ins.onInit().catch(MoServer.ErrorHandler);
        return ins;
    }

    static ErrorHandler(reason: Error) {
        console.log(reason.stack);
        throw reason;
    }

    /**
     *
     * @param instance 应用实例
     * 单一Node进程中应只包含单一 Instance
     */
    protected constructor(instance: any) {
        super();

        this.initInjector();
        this.initInstance(instance);
        this.bindExitProcess();
    }

    private async onInit() {
        // 装载plugins

        // 装载router
        for (const c of this.componentList) {
            if (c.onInit instanceof Function) {
                await c.onInit();
            }
        }

        this.handlePluginPackage();

        await this.routerManager.onInit();

        for (const application of this.serverCycleLife) {
            if (application.onInit instanceof Function) {
                await application.onInit();
            }
        }

        await this.serverManager.onInit();
    }

    private async onStart() {
        // await this.moInstance.onStart();
        for (const c of this.componentList) {
            if (c.onStart instanceof Function) {
                await c.onStart();
            }
        }

        await this.routerManager.onStart();

        for (const application of this.serverCycleLife) {
            if (application.onStart instanceof Function) {
                await application.onStart();
            }
        }

        await this.serverManager.onStart();
    }

    private async onStop() {
        // await this.moInstance.onStop();
        for (const c of this.componentList) {
            if (c.onStop instanceof Function) {
                await c.onStop();
            }
        }
        await this.routerManager.onStop();

        for (const application of this.serverCycleLife) {
            if (application.onStop instanceof Function) {
                await application.onStop();
            }
        }

        await this.serverManager.onStop();
    }

    async onExit() {
        // await this.moInstance.onExit();
    }

    /**
     * 开始加载服务器
     * 并设置状态
     */
    async startSever() {
        this.debug('starting MoBasicServer');
        await this.onStart().catch(MoServer.ErrorHandler);
    }


    private initInstance(instance: any) {
        const options: InstanceOptions = Reflect.getMetadata(INSTANCE, instance);
        this.instance = options.instance.name;
        this.serverManager.port = options.instance.port;
        this.serverManager.host = options.instance.host;

        const n = new instance();

        if (options.servers) {
            this.pushServer(options.servers);
        }

        if (options.modules) {
            this.pushModule(options.modules);
        }

        this.handleModule(instance);

    }

    private pushModule(modules: any[]) {
        if (modules instanceof Array) {
            modules.map(value => {
                if (!this.moduleList.has(value)) {
                    this.moduleList.add(value);
                    this.handleModule(value);
                }
            });
        }
    }

    private handleModule(module: any) {
        const options: ModuleOptions = Reflect.getMetadata(MODULE, module);

        if (options.components instanceof Array) {
            for (const component of options.components) {
                const cIns = this._injector.resolveAndInstantiate(<any>component);
                this.componentList.push(cIns);
            }
        }

        if (options.plugins) {
            this.pushPluginPackage(options.plugins);
        }

        if (options.routers instanceof Array) {
            this.pushRouter(options.routers);
        }


    }

    private pushServer(servers: any[]) {
        if (servers instanceof Array) {
            for (const server of servers) {
                // const sIns: IInjector = new server;
                const serverOptions: ServerOptions = Reflect.getMetadata(SERVER, server);
                const injector = this._injector.resolveAndCreateChild([<any>serverOptions.main]);
                const sManager = injector.get(serverOptions.main);
                this.serverList.set(server, sManager);
                this.serverCycleLife.push(sManager);
                if (serverOptions.components instanceof Array) {
                    for (const component of serverOptions.components) {
                        const cIns = injector.resolveAndInstantiate(component);
                        this.serverCycleLife.push(cIns);
                    }
                }
            }
        }
    }

    private pushPluginPackage(plugins: any[]) {
        if (plugins instanceof Array) {
            plugins.map(value => {
                if (!this.pluginPackageList.has(value)) {
                    const pPackage = this._injector.resolveAndInstantiate(value);
                    this.pluginPackageList.set(value, pPackage);
                }
            });
        }
    }

    private pushRouter(routers: any[]) {
        if (routers instanceof Array) {
            this.routerManager.addRouter(routers);
        }
    }

    private initInjector() {
        this._injector = ReflectiveInjector.resolveAndCreate(
            [
                {provide: MoServerToken, useValue: this},
                ServerManager,
                RouterManager
            ]);

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

    private handlePluginPackage() {
        this.pluginPackageList.forEach((value, key) => {
            const target = Reflect.getMetadata(TARGET, key);
            if (this.serverList.has(target)) {
                const server = this.serverList.get(target);
                if (server) {
                    server.addPlugin(value);
                }
            } else {
                this.debug(`plugin ${value.constructor.name} can not init to ${target.name}`);
            }
        });
    }
}


/**
 * Created by yskun on 2017/5/15.
 * MoProject COPYRIGHT
 */
