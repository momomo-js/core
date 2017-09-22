import {InjectionToken} from 'injection-js';
import {Mo} from '../mo';

export let METHOD = Symbol('METHOD');
export let MODEL_LIST = Symbol('MODEL_LIST');
export let PATH = Symbol('PATH');
export let PARAMS = Symbol('PARAMS');
export let CONTROLLER = Symbol('CONTROLLER');
export let INSTANCE = Symbol('INSTANCE');
export let TARGET = Symbol('TARGET');
export let MODULE = Symbol('MODULE');
export let SERVER = Symbol('SERVER');
export let CONTROLLER_LIST = Symbol('CONTROLLER_LIST');
export let SERVICE_LIST = Symbol('SERVICE_LIST');
export const PLUGINS = Symbol('plugins');
export let MoServerToken = new InjectionToken<Mo>('Mo');

/**
 * Created by yskun on 2017/7/7.
 * MoProject COPYRIGHT
 */
