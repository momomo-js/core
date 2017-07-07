import { MoApplication } from "../define/mo-application.class";
import { ControllerInterface } from "../define/controller.interface";
export declare class RouterManager extends MoApplication {
    private routerList;
    private _controllerList;
    constructor();
    addRouter(router: typeof Object): void;
    delRouter(router: typeof Object): void;
    refreshControllerList(): void;
    readonly controllerList: ControllerInterface[];
}
