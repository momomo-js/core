import {Mo} from './mo.class';
import {MoServer} from '../bin/moserver';

/**
 * @deprecated
 * MoApplication的基础类，提供相应的规范
 */
export abstract class MoApplication extends Mo {
    public instance: string;
    protected moServer: MoServer;
    protected context: MoApplication;

    constructor() {
        super();
    }

    protected loadMoApplication<T extends MoApplication>(moApplication: T): T {
        moApplication.moServer = this.moServer;
        moApplication.context = this;
        return moApplication;
    }

}

/**
 * Created by yskun on 2017/5/15.
 * MoProject COPYRIGHT
 */
