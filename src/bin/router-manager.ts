import {MoApplication} from "../define/mo-application.class";
import {IRouter} from "../define/router.interface";
import {IController} from "../define/controller.interface";
import {Provider, ReflectiveInjector} from "injection-js";
import {CONTROLLER_LIST, SERVICE_LIST} from "../decorator/symbol";

export class RouterManager extends MoApplication {
    private _routerList: IRouter[] = [];
    private _serviceList: Array<any> = [];
    private _injector: ReflectiveInjector;

    addRouter(routerList: any[]) {
        for (let router of routerList) {
            let rIns = new router() as IRouter;

            for (let r of this._routerList) {
                if (r.constructor.name == rIns.constructor.name) {
                    return;
                }
            }

            this._routerList.push(rIns as IRouter);
        }
    }

    delRouter(router: any) {

        for (let i = 0; i < this._routerList.length; i++) {
            if (this._routerList[i].constructor.name == router.constructor.name) {
                this._routerList.splice(i, i);
                return;
            }
        }

    }


    get controllerList(): IController[] {
        let controller_List = [];

        for (let r of this._routerList) {
            r = r as IRouter;
            controller_List.push(...r.controllers);
        }
        return controller_List;
    }

    addService(service: Provider[]) {
        this._serviceList.push(...service);
    }

    init() {
        this._injector = ReflectiveInjector.resolveAndCreate(this._serviceList);
        for (let r of this._routerList) {
            r = r as IRouter;

            let controller_list: any[] = Reflect.getMetadata(CONTROLLER_LIST, r.constructor);
            let service_list: any[] = Reflect.getMetadata(SERVICE_LIST, r.constructor);
            let provider: any[] = [];

            if (service_list)
                provider.push(...service_list);

            if (controller_list)
                provider.push(...controller_list);

            r._injector = ReflectiveInjector.resolveAndCreate(provider, this._injector);

            r.controllers = new Map<any, IController>();
            r.services = new Map<any, any>();

            if (service_list)
                for (let s of service_list) {
                    let sIns = r._injector.get(s);
                    r.services.set(s, sIns);
                }

            if (controller_list)
                for (let c of controller_list) {
                    let cIns = r._injector.get(c) as IController;
                    cIns.router = r;
                    r.controllers.set(c, cIns);
                }
        }
    }
}

/**
 * Created by yskun on 2017/7/5.
 * MoProject COPYRIGHT
 */
