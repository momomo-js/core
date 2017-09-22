import {MetadataArray} from '../util/metadata-array';
import {PLUGINS} from './symbol';


export function Plugin(name: symbol) {
    return function (target: any, propertyKey: string) {
        Reflect.defineMetadata(PLUGINS, name, target, propertyKey);
        const pluginList: Array<string> = MetadataArray(PLUGINS, target);

        pluginList.push(propertyKey);
    }
}

/**
 * Created by yskun on 2017/7/3.
 * MoProject COPYRIGHT
 */
