import {RouterInterface} from "../define/router.class";
import {RouterOptions} from "../define/router-options.interface";
import {ControllerInterface} from "../define/controller.interface";
export function Router(options?: RouterOptions) {
    return (target) => {
        let original = target;

        function construct(constructor, args) {
            let c: any = function () {
                let cIns = new constructor(...args) as RouterInterface;
                cIns.controllers = [];
                if (options) {
                    if (options.controllers) {
                        for (let controller of options.controllers) {
                            let controllerIns = new controller as ControllerInterface;
                            cIns.controllers.push(controllerIns);
                        }
                    }
                }
                return cIns;
            };

            c.prototype = constructor.prototype;
            return new c();

        }

        // the new constructor behavior
        let f: any = function (...args) {
            return construct(original, args);
        };

        // copy prototype so instanceof operator still works
        f.prototype = original.prototype;

        // return new constructor (will override original)
        return f;
    }

}

/**
 * Created by yskun on 2017/7/7.
 */
