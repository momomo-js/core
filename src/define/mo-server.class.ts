import {PLUGINS} from '../decorator/plugin';
import {Mo} from './mo.class';
import {MoApplicationCycleLife} from './mo-cycle-life.interface';

export abstract class MoBasicServer extends Mo implements MoApplicationCycleLife {

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

    onStop() {
        this.debug(`stopping ${this.instance}`)
    }

    onStart() {
        this.debug(`starting ${this.instance}`)
    }

    onInit() {
        this.debug(`initializing  ${this.instance}`)
    }

}

/**
 * Created by yskun on 2017/7/3.
 * MoProject COPYRIGHT
 */
