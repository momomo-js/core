import "reflect-metadata";
import { MoApplication } from "../define/mo-application.class";
import { ServerManager } from "./server-manager";
import { State } from "../define/state.enum";
import { MoBasicServer } from "../define/mo-server.class";
import { RouterManager } from "./router-manager";
import { Module } from "../define/module.class";
import { ReflectiveInjector } from "injection-js";
export declare class MoServer extends MoApplication {
    serverManager: ServerManager;
    routerManager: RouterManager;
    instanceName: string;
    serverList: MoBasicServer[];
    moduleList: Module[];
    _injector: ReflectiveInjector;
    pluginList: any[];
    constructor(instance?: string, port?: number);
    state: State;
    startSever(): void;
    addServer<T extends MoBasicServer>(server: T): void;
    addModule<T extends Module>(module: T): void;
    private initPlugin();
    addPlugin(plugins: any[]): void;
}
