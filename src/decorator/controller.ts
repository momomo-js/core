import {IController} from '../define/controller.interface';
import {ControllerOptions} from '../define/controller-options.interface';
import {MODELLIST, PATH} from './symbol';

export function Controller(options?: ControllerOptions) {
    return (target) => {
        const original = target;

        function construct(constructor, args) {
            const c: any = function () {
                const cIns = new constructor(...args) as IController;
                cIns.modelList = new Map<String, Object>();
                return cIns;
            };

            c.prototype = constructor.prototype;

            const cIns = new c();
            let path: String;

            if (options) {
                if (!options.path) {
                    const cInsName = cIns.constructor.name;
                    path = '/' + cInsName.replace('Controller', '').toLowerCase();
                } else {
                    path = options.path;
                }

                if (options.models) {
                    for (const model of options.models) {
                        cIns.modelList.set(model.name, model);
                    }

                    Reflect.defineMetadata(MODELLIST, options.models, cIns);
                }
            } else {
                const cInsName = cIns.constructor.name;
                path = cInsName.replace('Controller', '').toLowerCase();
            }

            Reflect.defineMetadata(PATH, path, cIns);
            return cIns;

        }

        // the new constructor behavior
        const f: any = function (...args) {
            return construct(original, args);
        };

        // copy prototype so instanceof operator still works
        f.prototype = original.prototype;

        const param = Reflect.getMetadata('design:paramtypes', original);

        Reflect.defineMetadata('design:paramtypes', param, f);
        // return new constructor (will override original)
        return f;
    }

}

/**
 * Created by yskun on 2017/7/7.
 * MoProject COPYRIGHT
 */
