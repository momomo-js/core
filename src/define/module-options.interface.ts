import {Component} from './component.class';

export interface ModuleOptions {
    routers?: any[];
    plugins?: any[];
    components?: typeof Component[];
}
