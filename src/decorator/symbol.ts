import {InjectionToken} from 'injection-js';
import {MoServer} from '../bin/moserver';

export let METHOD = Symbol('METHOD');
export let MODELLIST = Symbol('MODELLIST');
export let PATH = Symbol('PATH');
export let PARAMS = Symbol('PARAMS');
export let CONTROLLER = Symbol('CONTROLLER');
export let CONTROLLER_LIST = Symbol('CONTROLLER_LIST');
export let SERVICE_LIST = Symbol('SERVICE_LIST');
export let MoServerToken = new InjectionToken<MoServer>('MoServer');

/**
 * Created by yskun on 2017/7/7.
 * MoProject COPYRIGHT
 */
