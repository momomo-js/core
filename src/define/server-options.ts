import {MoBasicServer} from './mo-server.class';

export interface ServerOptions {
    components?: any[];
    main: typeof MoBasicServer;
}
