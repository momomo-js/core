import {RouterOptions} from "../define/router-options.interface";
import {CONTROLLER_LIST, SERVICE_LIST} from "./symbol";

export function Router(options?: RouterOptions) {
    return function (target) {
        if(options)
        {
            if(options.controllers)
            {
                Reflect.defineMetadata(CONTROLLER_LIST, options.controllers, target);
            }
            if(options.services)
            {
                Reflect.defineMetadata(SERVICE_LIST,options.services,target);
            }
        }
    }
}

/**
    * Created by yskun on 2017/7/7.
    * MoProject COPYRIGHT
    */
