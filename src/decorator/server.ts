import {ServerOptions} from '../define/server-options';

export function Server(options: ServerOptions) {
    return (target: any) => {
        Reflect.defineMetadata('server', options, target)
    }
}
