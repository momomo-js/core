import { MoApplication } from "./mo-application.class";
export declare abstract class MoBasicServer extends MoApplication {
    abstract start(): void;
    abstract init(): void;
    pause(): void;
    stop(): void;
    restart(): void;
    protected static getPlugin(pack: Object, type: symbol): any[];
}
