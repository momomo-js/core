import {Mo} from './mo.class';
import {OnInit, OnStart} from './mo-cycle-life.interface';

export abstract class Module extends Mo implements OnInit, OnStart {

    abstract onInit(): void;

    abstract onStart(): void;
}

/**
 * Created by yskun on 2017/7/15.
 */
