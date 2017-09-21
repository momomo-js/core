import {Mo} from '../define/mo.class';
import {MoServer} from './moserver';

export class LifeCycleManager extends Mo {
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
            MoServer.ErrorHandler(e);
        }
    }
}
