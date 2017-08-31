import {MoInstanceCycleLife} from './mo-cycle-life.interface';
import {Mo} from './mo.class';

export abstract class MoInstance extends Mo implements MoInstanceCycleLife {

    abstract onInit();

    abstract onStart();

    onStop() {
    }

    onExit() {
        this.debug('exit');
        process.exit(0);
    }
}

/**
 * Created by yskun on 2017/8/28.
 * MoProject COPYRIGHT
 */
