import {ReflectiveInjector} from 'injection-js';
import {MoServer} from './moserver';
import {RouterManager} from './router-manager';
import {ServerManager} from './server-manager';
import {INSTANCE, MODULE, MoServerToken, SERVER, TARGET} from '../decorator/symbol';
import {Mo} from '../define/mo.class';
import {LifeCycleManager} from './life-cycle-manager';
import {ModuleOptions} from '../define/module-options.interface';
import {ServerOptions} from '../define/server-options';
import {InstanceOptions} from '../define/instance-options.interface';

export class InstanceManager extends Mo {
    private moInstance: any;
    private moModules: Set<any> = new Set();
    private pluginPackages: Map<any, any> = new Map();
    private servers: Map<any, any> = new Map();

    private lifeCycleManager: LifeCycleManager = new LifeCycleManager;
    private injector: ReflectiveInjector;

    static create(instance: any, moServer: MoServer) {
        const m = new InstanceManager();
        if (m && m.onCreate(instance, moServer)) {
            return m;
        } else {
            throw new Error(`MoServer Can't create InstanceManager`);
        }
    }

    private onCreate(instance: any, moServer: MoServer) {
        this.moInstance = instance;
        this.initInjector(moServer);
        this.initInstance();
        return true;
    }

    async onInit() {
        this.handlePluginPackage();
        await this.lifeCycleManager.run('onInit');
    }

    async onStart() {
        await this.lifeCycleManager.run('onStart');
    }

    async onStop() {
        await this.lifeCycleManager.run('onStop');
    }

    async onExit() {
        await this.lifeCycleManager.run('onExit');
    }

    private initInjector(moServer: any) {
        this.injector = ReflectiveInjector.resolveAndCreate(
            [
                {provide: MoServerToken, useValue: moServer},
                ServerManager,
                RouterManager
            ]);

        this.lifeCycleManager.add(this.injector.get(RouterManager));
        this.lifeCycleManager.add(this.injector.get(ServerManager));
    }

    private initInstance() {
        const options: InstanceOptions = Reflect.getMetadata(INSTANCE, this.moInstance);
        const serverManager: ServerManager = this.injector.get(ServerManager);
        serverManager.port = options.instance.port;
        serverManager.host = options.instance.host;

        const moInstance = this.injector.resolveAndInstantiate(this.moInstance);
        this.lifeCycleManager.add(moInstance, 3);

        if (options.servers instanceof Array) {
            this.addServer(options.servers);
        }

        if (options.modules instanceof Array) {
            this.addModule(options.modules);
        }

        this.handleModule(this.moInstance);

    }

    private handleModule(module: any) {
        const options: ModuleOptions = Reflect.getMetadata(MODULE, module);

        if (!options) {
            throw new Error(`the module ${module.name} hasn't Module decorator`)
        }

        if (options.components instanceof Array) {
            for (const component of options.components) {
                if (!this.moModules.has(component)) {
                    const cIns = this.injector.resolveAndInstantiate(<any>component);
                    this.lifeCycleManager.add(cIns, 2);
                    this.moModules.add(cIns);
                }
            }
        }

        if (options.plugins instanceof Array) {
            options.plugins.map(value => {
                if (!this.pluginPackages.has(value)) {
                    const pPackage = this.injector.resolveAndInstantiate(value);
                    this.pluginPackages.set(value, pPackage);
                }
            });
        }

        if (options.routers instanceof Array) {
            const routerManager: RouterManager = this.injector.get(RouterManager);
            routerManager.addRouter(options.routers);
        }

    }

    private addModule(modules: any[]) {
        modules.map(value => {
            if (!this.moModules.has(value)) {
                this.handleModule(value);
                this.moModules.add(value);
            }
        });
    }

    private addServer(servers: any[]) {
        for (const server of servers) {
            const options: ServerOptions = Reflect.getMetadata(SERVER, server);

            if (!options) {
                throw new Error(`the module ${server.name} hasn't Server decorator`)
            }

            const injector = this.injector.resolveAndCreateChild([options.main]);
            const serverIns = injector.get(options.main);
            this.lifeCycleManager.add(serverIns, 0);
            this.servers.set(server, serverIns);

            if (options.components instanceof Array) {
                for (const component of options.components) {
                    const cIns = injector.resolveAndInstantiate(component);
                    this.lifeCycleManager.add(cIns, 0);
                }
            }
        }
    }

    private handlePluginPackage() {
        this.pluginPackages.forEach((value, key) => {
            const target = Reflect.getMetadata(TARGET, key);
            if (!target) {
                throw new Error(`no target`);
            }

            if (this.servers.has(target)) {
                const server = this.servers.get(target);
                if (server) {
                    server.addPlugin(value);
                }
            } else {
                this.debug(`plugin ${value.constructor.name} can not init to ${target.name}`);
            }
        });
    }

}
