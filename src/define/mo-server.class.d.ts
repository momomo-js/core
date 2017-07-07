import { MoApplication } from "./mo-application.class";
import "reflect-metadata";
export declare abstract class MoBasicServer extends MoApplication {
    abstract start(): void;
    abstract init(): void;
    pause(): void;
    stop(): void;
    restart(): void;
    protected getPlugin(pack: Object, name: symbol): any;
}
