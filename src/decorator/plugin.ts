export const PLUGINS = Symbol("plugins");

export function Plugin(name: symbol) {
    return function (target: any, propertyKey: string) {
        Reflect.defineMetadata(PLUGINS, name, target, propertyKey);
        let pluginList: Array<string> = Reflect.getMetadata(PLUGINS, target);

        if (!pluginList) {
            pluginList = [];
            Reflect.defineMetadata(PLUGINS, pluginList, target);
        }

        pluginList.push(propertyKey);
    }
}

/**
 * Created by yskun on 2017/7/3.
 */
