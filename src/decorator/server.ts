import {ServerOptions} from '../define/server-options';
import {SERVER} from "./symbol";

export function Server(options: ServerOptions) {
    return (target: any) => {
        Reflect.defineMetadata(SERVER, options, target)
    }
}
