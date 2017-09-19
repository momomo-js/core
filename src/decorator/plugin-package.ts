import {TARGET} from './symbol';

export function PluginPackage(pluginTarget: any) {
    return (target: any) => {
        Reflect.defineMetadata(TARGET, pluginTarget, target);
    }
}
