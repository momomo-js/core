import {TARGET} from './symbol';

export function PluginPackage(target: any) {
    return (t: any) => {
        Reflect.defineMetadata(TARGET, target, t);
    }
}
