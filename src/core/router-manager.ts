import {IRouter} from '../define/router.interface';
import {Provider, ReflectiveInjector} from 'injection-js';
import {CONTROLLER_LIST, SERVICE_LIST} from '../decorator/symbol';
import {MoBasic} from '../define/mo-basic.class';
import {OnInit} from '../define/mo-cycle-life.interface';

export class RouterManager extends MoBasic implements OnInit {
    private _routerList: Map<any, IRouter> = new Map();
    private _serviceList: Array<any> = [];
    private _injector: ReflectiveInjector;

    get controllerList(): any[] {
        const controller_List: any[] = [];

        for (const r of this._routerList) {
            // todo Controller Should Change to the metadata-type
            for (const c of r[1].controllers) {
                controller_List.push(c[1]);
            }
        }
        return controller_List;
    }

    onInit() {
        this.debug(`init router`);
        this._injector = ReflectiveInjector.resolveAndCreate(this._serviceList);
        for (const router of this._routerList) {

            const r = router[1];
            this.debug(`init -> ${r.constructor.name}`);

            const controller_list: any[] = Reflect.getMetadata(CONTROLLER_LIST, r.constructor);
            const service_list: any[] = Reflect.getMetadata(SERVICE_LIST, r.constructor);
            const provider: any[] = [];

            if (controller_list) {
                provider.push.apply(provider, controller_list);
            }

            if (service_list) {
                provider.push.apply(provider, service_list);
            }

            r._injector = ReflectiveInjector.resolveAndCreate(provider, this._injector);

            r.controllers = new Map<any, any>();

            if (controller_list) {
                for (const c of controller_list) {
                    const cIns = <any>r._injector.get(c);
                    cIns.router = r;
                    r.controllers.set(c, cIns);
                }
            }
        }
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

    addProvider(providers: Provider[]) {
        this._serviceList.push.apply(this._serviceList, providers);
    }

}

/**
 * Created by yskun on 2017/7/5.
 * MoProject COPYRIGHT
 */
