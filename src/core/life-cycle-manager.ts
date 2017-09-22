import {MoBasic} from '../define/mo-basic.class';
import {Mo} from '../mo';

export class LifeCycleManager extends MoBasic {
    runtimeList: any[][] = [[], [], [], [], []];

    add(module: any, level: 0 | 1 | 2 | 3 | 4 = 4): void {
        this.runtimeList[level].push(module);
    }

    async run(func: string): Promise<void> {
        this.debug(`running ${func}`);
        try {
            for (const list of this.runtimeList) {
                for (const r of list) {
                    if (r[func] instanceof Function) {
                        this.debug(`  -> ${r.constructor.name}`);
                        await r[func]();
                    }
                }
            }
        } catch (e) {
            Mo.ErrorHandler(e);
        }
    }
}
