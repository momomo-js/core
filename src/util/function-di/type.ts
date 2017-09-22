import {Parameter} from './function-di';
import {PARAMS} from '../../decorator/symbol';
import {MetadataArray} from '../metadata-array';

function getProp(method: 'body' | 'params' | 'query', prop: string) {
    return method + ':' + prop;
}

export function Type(method: 'body' | 'params' | 'query', prop: string) {
    return (target: Object, propertyKey: string | symbol, parameterIndex: number) => {
        const specParam: Parameter[] = MetadataArray(PARAMS, target, <string>propertyKey);

        specParam[parameterIndex] = {
            type: getProp(method, prop),
            spec: true,
            index: parameterIndex
        }
    }
}
