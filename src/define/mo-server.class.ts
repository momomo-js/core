import {MoApplication} from "./mo-application.class";
import "reflect-metadata";
import {PLUGINS} from "../decorator/mo-plugin";

export abstract class MoBasicServer extends MoApplication {
    abstract start():void;

    abstract init():void;

    pause():void {

    }

    stop():void {

    }

    restart():void {

    }

    protected getPlugin(pack: Object, name: symbol): any {
        for (let a in pack) {
            let str = Reflect.getMetadata(PLUGINS, pack[a]);
            if (str === name) {
                return pack[a];
            }
        }
        return null;
    }
}

/**
 * Created by yskun on 2017/7/3.
 */
