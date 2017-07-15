import { MoApplication } from "./mo-application.class";
export declare abstract class Module extends MoApplication {
    abstract init(): void;
    abstract start(): void;
}
