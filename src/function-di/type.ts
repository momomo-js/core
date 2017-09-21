import {Parameter} from './function-di';
import {PARAMS} from '../decorator/symbol';

function getProp(method: 'body' | 'params' | 'query', prop: string) {
    return method + ':' + prop;
}

export function Type(method: 'body' | 'params' | 'query', prop: string) {
    return (target: Object, propertyKey: string | symbol, parameterIndex: number) => {
        let specParam: Parameter[] = Reflect.getMetadata(PARAMS, target, propertyKey);
        if (!specParam) {
            specParam = [];
            Reflect.defineMetadata(PARAMS, specParam, target, propertyKey);
        }

        specParam[parameterIndex] = {
            type: getProp(method, prop),
            spec: true,
            index: parameterIndex
        }
    }
}
