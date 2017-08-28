import * as debug from 'debug';

/**
 * Mo 基础类，框架中所有类均基于Mo。
 */
export abstract class Mo {
    public instance: string;
    private _debug: debug.IDebugger = debug('Mo');

    constructor() {
        this.instance = this.constructor.name;
    }
    get debug(): debug.IDebugger {
        this._debug.namespace = this.instance + ': MoServer';
        return this._debug;
    }

}

/**
 * Created by yskun on 2017/5/17.
 * MoProject COPYRIGHT
 */
