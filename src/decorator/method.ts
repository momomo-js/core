import {CONTROLLER, METHOD, PATH} from './symbol';
import {MetadataArray} from '../util/metadata-array';

export function Method(method: symbol, path?: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const ControllerMethod = MetadataArray(CONTROLLER, target);

        ControllerMethod.push(target[propertyKey]);

        Reflect.defineMetadata(METHOD, method, target, propertyKey);

        if (!path) {
            path = '/' + propertyKey;
        }

        Reflect.defineMetadata(PATH, path, target, propertyKey);
    };
}

/**
 * Created by yskun on 2017/7/7.
 * MoProject COPYRIGHT
 */
