import { MoApplication } from "../define/mo-application.class";
import { ControllerInterface } from "../define/controller.interface";
export declare class RouterManager extends MoApplication {
    private routerList;
    private _controllerList;
    constructor();
    addRouter(router: any): void;
    delRouter(router: any): void;
    refreshControllerList(): void;
    readonly controllerList: ControllerInterface[];
}
