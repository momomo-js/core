import {MoApplication} from "./mo-application.class";
import {PLUGINS} from "../decorator/plugin";

export abstract class MoBasicServer extends MoApplication {
    abstract start(): void;

    abstract init(): void;

    pause(): void {

    }

    stop(): void {

    }

    restart(): void {

    }

    protected static getPlugin(pack: Object, type: symbol): object[] {

        let pluginList: Array<any> = Reflect.getMetadata(PLUGINS, pack);

        let ret = [];

        for (let p of pluginList) {
            let Type = Reflect.getMetadata(PLUGINS, pack, p);
            if (Type == type) {
                ret.push(pack[p]);
            }
        }
        return ret;
    }
}

/**
 * Created by yskun on 2017/7/3.
 */
