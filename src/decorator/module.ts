import {ModuleOptions} from '../define/module-options.interface';
import {MODULE} from './symbol';

export function Module(options: ModuleOptions) {
    return (target: any) => {
        Reflect.defineMetadata(MODULE, options, target);
    }
}
