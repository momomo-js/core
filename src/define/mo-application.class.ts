import {Mo} from "./mo.class";
import {MoServer} from "../bin/moserver";
import {State} from "./state.enum";

/**
 * MoApplication的基础类，提供相应的规范
 */
export abstract class MoApplication extends Mo {
    protected constructor() {
        super();
        this.context = null;
        this.moServer = null;
    }

    protected moServer: MoServer;
    protected context: MoApplication;
    public instance: string;

    protected loadMoApplication<T extends MoApplication>(moApplication: T): T {
        moApplication.moServer = this.moServer;
        moApplication.context = this;
        moApplication.debug = this.moServer.debug;
        return moApplication;
    }

    protected _state:State;

    get state()
    {
        return this._state;
    }
}

/**
 * Created by yskun on 2017/5/15.
 */
