import {IRouter} from '../define/router.interface';
import {IController} from '../define/controller.interface';
import {Provider, ReflectiveInjector} from 'injection-js';
import {CONTROLLER_LIST, SERVICE_LIST} from '../decorator/symbol';
import {Mo} from '../define/mo.class';
import {MoApplicationCycleLife} from '../define/mo-cycle-life.interface';

export class RouterManager extends Mo implements MoApplicationCycleLife {
    private _routerList: Map<any, IRouter> = new Map();
    private _serviceList: Array<any> = [];
    private _injector: ReflectiveInjector;

    get controllerList(): IController[] {
        const controller_List: IController[] = [];

        for (const r of this._routerList) {
            // todo Controller Should Change to the metadata-type
            for (const c of r[1].controllers) {
                controller_List.push(c[1]);
            }
        }
        return controller_List;
    }

    onInit() {
        this._injector = ReflectiveInjector.resolveAndCreate(this._serviceList);
        for (const router of this._routerList) {

            const r = router[1];

            const controller_list: any[] = Reflect.getMetadata(CONTROLLER_LIST, r.constructor);
            const service_list: any[] = Reflect.getMetadata(SERVICE_LIST, r.constructor);
            const provider: any[] = [];

            if (service_list) {
                provider.push(...service_list);
            }

            if (controller_list) {
                provider.push(...controller_list);
            }

            r._injector = ReflectiveInjector.resolveAndCreate(provider, this._injector);

            r.controllers = new Map<any, IController>();
            r.services = new Map<any, any>();

            if (service_list) {
                for (const s of service_list) {
                    const sIns = r._injector.get(s);
                    r.services.set(s, sIns);
                }
            }

            if (controller_list) {
                for (const c of controller_list) {
                    const cIns = <IController>r._injector.get(c);
                    cIns.router = r;
                    r.controllers.set(c, cIns);
                }
            }
        }
    }

    onStart() {
    }

    onStop() {
    }

    addRouter(routerList: any[]) {
        for (const r of routerList) {
            if (!this._routerList.has(r)) {
                const rIns = new r;
                this._routerList.set(r, rIns as IRouter);
            } else {
                this.debug(`${r.constructor.name} has been initialization`);
            }
        }
    }

    delRouter(router: any): boolean {
        return this._routerList.delete(router);
    }

    addService(service: Provider[]) {
        this._serviceList.push(...service);
    }

}

/**
 * Created by yskun on 2017/7/5.
 * MoProject COPYRIGHT
 */
