import {ControllerOptions} from '../define/controller-options.interface';
import {MODEL_LIST, PATH} from './symbol';

export function Controller(options?: ControllerOptions) {
    return (target: any) => {

        if (options && options.models) {
            const s: Set<any> = new Set(options.models);
            Reflect.defineMetadata(MODEL_LIST, s, target);
        }

        let path: String;
        if (options && options.path) {
            path = options.path;
        } else {
            const cInsName = target.name;
            path = cInsName.replace('Controller', '').toLowerCase();
        }
        Reflect.defineMetadata(PATH, path, target);
    }
}

/**
 * Created by yskun on 2017/7/7.
 * MoProject COPYRIGHT
 */
