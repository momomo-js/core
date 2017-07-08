
import {METHOD, PARAMS, PATH} from "./symbol";
export function  Method(method:symbol,path?:string){
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        Reflect.defineMetadata(METHOD,method,target,propertyKey);
        let q:Array<any> = Reflect.getMetadata("design:paramtypes",target,propertyKey);
        let s:String[] = q.map(o=>o.name);
        Reflect.defineMetadata(PARAMS,s,target,propertyKey);
        if(path)
            Reflect.defineMetadata(PATH,path,target,propertyKey);
    };
}

/**
 * Created by yskun on 2017/7/7.
 */