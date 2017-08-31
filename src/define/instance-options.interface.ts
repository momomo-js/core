import {ModuleOptions} from './module-options.interface';

export interface InstanceOptions extends ModuleOptions {
    servers: any[];
    modules?: any[];
    instance: {
        name: string;
        port: number;
        host: string;
    }
}
