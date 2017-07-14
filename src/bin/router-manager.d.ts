import { MoApplication } from "../define/mo-application.class";
import { IController } from "../define/controller.interface";
export declare class RouterManager extends MoApplication {
    private _routerList;
    private _serviceList;
    private _injector;
    addRouter(routerList: any[]): void;
    delRouter(router: any): void;
    readonly controllerList: IController[];
    addService(service: any[]): void;
    init(): void;
}
