import {IController} from './controller.interface';
import {ReflectiveInjector} from 'injection-js';

export interface IRouter {
    controllers: Map<any, IController>;
    services: Map<any, any>;
    _injector: ReflectiveInjector;
}

/**
 * Created by yskun on 2017/5/17.
 * MoProject COPYRIGHT
 */
