import {Mo} from './mo.class';
import {MoApplicationCycleLife, OnInit, OnStart} from './mo-cycle-life.interface';

export abstract class Component extends Mo implements MoApplicationCycleLife {

    abstract onInit(): void;

    abstract onStart(): void;

    abstract onStop(): void;

}

/**
 * Created by yskun on 2017/7/15.
 */
