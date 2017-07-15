import { Mo } from "./mo.class";
import { MoServer } from "../bin/moserver";
import { State } from "./state.enum";
export declare abstract class MoApplication extends Mo {
    constructor();
    protected moServer: MoServer;
    protected context: MoApplication;
    instance: string;
    protected loadMoApplication<T extends MoApplication>(moApplication: T): T;
    protected _state: State;
    readonly state: State;
}
