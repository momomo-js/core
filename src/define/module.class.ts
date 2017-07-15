import {MoApplication} from "./mo-application.class";
export abstract class Module extends MoApplication {
    abstract init():void;
    abstract start():void;
}

/**
 * Created by yskun on 2017/7/15.
 */
