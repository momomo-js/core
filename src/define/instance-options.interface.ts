import {MoBasicServer} from './mo-server.class';
import {ModuleOptions} from './module-options.interface';

export interface InstanceOptions extends ModuleOptions {
    servers: typeof MoBasicServer[];
    modules: any[];
    instance: {
        name: string;
        port: number;
        host: string;
    }
}
