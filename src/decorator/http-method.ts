
import {METHOD} from "./symbol";
export function  Method(method:symbol){
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        Reflect.defineMetadata(METHOD,method,target,propertyKey);
    };
}

/**
 * Created by yskun on 2017/7/7.
 */
