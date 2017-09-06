import * as coIns from 'co';

export {Injectable, Inject} from 'injection-js';
export let co: (fun: Function) => Promise<Object | null | void | any> = coIns;



/**
 * Created by yskun on 2017/7/14.
 * MoProject COPYRIGHT
 */
