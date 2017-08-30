import {InstanceOptions} from '../define/instance-options.interface';
import {INSTANCE, MODULE} from './symbol';
import {ModuleOptions} from '../define/module-options.interface';

export function Instance(options: InstanceOptions) {
    return (target: any) => {
        const module: ModuleOptions = {
            modules: options.modules,
            routers: options.routers,
            plugins: options.plugins
        };
        const instance: InstanceOptions = {
            instance: options.instance,
            servers: options.servers
        };

        Reflect.defineMetadata(target, MODULE, module);
        Reflect.defineMetadata(target, INSTANCE, instance);
    }
}
