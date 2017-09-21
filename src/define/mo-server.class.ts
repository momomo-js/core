import {PLUGINS} from '../decorator/plugin';
import {Mo} from './mo.class';

export abstract class MoBasicServer extends Mo {

    protected static getPlugin(pack: any, type: symbol): any[] {

        const pluginList: Array<string> = Reflect.getMetadata(PLUGINS, pack);

        const ret: any[] = [];
        for (const p of pluginList) {
            const Type: any = Reflect.getMetadata(PLUGINS, pack, p);
            if (Type === type) {
                ret.push(pack[p]);
            }
        }
        return ret;
    }


    addPlugin(Package: any): void {
    }

}

/**
 * Created by yskun on 2017/7/3.
 * MoProject COPYRIGHT
 */
