import 'reflect-metadata';
import {ServerManager} from './server-manager';
import {MoBasicServer} from '../define/mo-server.class';
import {RouterManager} from './router-manager';
import {Component} from '../define/component.class';
import {ReflectiveInjector} from 'injection-js';
import {Mo} from '../define/mo.class';
import {MoApplicationCycleLife, MoCycleLife} from '../define/mo-cycle-life.interface';
import {MoInstance} from '../define/mo-instance.class';
import {INSTANCE, MODULE, MoServerToken, SERVER, TARGET} from '../decorator/symbol';
import {InstanceOptions} from '../define/instance-options.interface';
import {ModuleOptions} from '../define/module-options.interface';
import {ServerOptions} from '../define/server-options';
import {IInjector} from '../define/injector.interface';

/**
 * 创建MoCreate实例
 */
export class MoServer extends Mo implements MoCycleLife {
    serverManager: ServerManager;
    routerManager: RouterManager;
    moInstance: MoInstance;
    moduleList: Map<any, Component> = new Map();
    serverList: Map<any, MoBasicServer> = new Map();
    pluginPackageList: Map<any, any> = new Map();
    _injector: ReflectiveInjector;

    private serverCycleLife: MoApplicationCycleLife[] = [];

    /**
     *
     * @param instance 网站实例
     */
    constructor(instance: MoInstance) {
        super();
        this.initInjector(instance);
        this.initInstance();
        this.bindExitProcess();
    }

    async onInit() {
        // 装载plugins

        // 装载router
        await this.moInstance.onInit();

        this.handlePluginPackage();

        await this.routerManager.onInit();

        for (const application of this.serverCycleLife) {
            if (application.onInit instanceof Function) {
                await application.onInit();
            }
        }

        await this.serverManager.onInit();
    }

    async onStart() {
        await this.moInstance.onStart();

        await this.routerManager.onStart();

        for (const application of this.serverCycleLife) {
            if (application.onStart instanceof Function) {
                await application.onStart();
            }
        }

        await this.serverManager.onStart();
    }

    async onStop() {
        await this.moInstance.onStop();

        await this.routerManager.onStop();

        for (const application of this.serverCycleLife) {
            if (application.onStop instanceof Function) {
                await application.onStop();
            }
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


    private initInstance() {
        const options: InstanceOptions = Reflect.getMetadata(INSTANCE, this.moInstance);
        this.instance = options.instance.name;
        this.serverManager.port = options.instance.port;
        this.serverManager.host = options.instance.host;

        if (options.servers) {
            this.pushServer(options.servers);
        }

        if (options.modules) {
            this.pushModule(options.modules);
        }

        this.handleModule(this.moInstance);

    }

    private pushModule(modules: any[]) {
        if (modules instanceof Array) {
            modules.map(value => {
                if (!this.moduleList.has(value)) {
                    const module = this._injector.resolveAndInstantiate(value);
                    this.moduleList.set(value, module);
                    this.handleModule(module);
                }
            });
        }
    }

    private handleModule(module: any) {
        const options: ModuleOptions = Reflect.getMetadata(MODULE, module);

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
                const sIns: IInjector = new server;
                const serverOptions: ServerOptions = Reflect.getMetadata(SERVER, sIns);
                sIns._injector = this._injector.resolveAndCreateChild([<any>serverOptions.main]);
                const sManager = sIns._injector.get(serverOptions.main);
                this.serverCycleLife.push(sManager);
                if (serverOptions.components instanceof Array) {
                    for (const component of serverOptions.components) {
                        const cIns = sIns._injector.resolveAndInstantiate(component);
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

    private handlePluginPackage() {
        this.pluginPackageList.forEach(value => {
            const target = Reflect.getMetadata(TARGET, value);
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
