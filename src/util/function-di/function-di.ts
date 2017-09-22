import {MoBasic} from '../../define/mo-basic.class';
import {PARAMS} from '../../decorator/symbol';

export interface TypeProvider {
    type: string | any;
    useValue: any;
}

export interface Parameter {
    type: any;
    index: number;
    spec: boolean;
}

export class FunctionDi extends MoBasic {

    private params: Map<any, any> = new Map();
    THROW_Error: Boolean = true;

    static create(providers: TypeProvider[], throwError: boolean = true): FunctionDi {
        const fun = new FunctionDi();
        fun.THROW_Error = throwError;
        fun.push(providers);
        return fun;
    }

    static getFunctionParam(ins: any, cFun: Function) {

        let funDIParams: Parameter[] = Reflect.getMetadata('fundi:params', ins, cFun.name);
        if (!funDIParams) {
            funDIParams = [];
            const cFunParams: any[] = Reflect.getMetadata('design:paramtypes', ins, cFun.name);
            const specParams: Parameter[] = Reflect.getMetadata(PARAMS, ins, cFun.name);

            if (specParams) {
                specParams.forEach(value => {
                    funDIParams[value.index] = value;
                });
            }

            cFunParams.forEach((value, index) => {
                if (!funDIParams[index]) {
                    funDIParams[index] = {
                        type: value,
                        index: index,
                        spec: false
                    }
                }
            });
            Reflect.defineMetadata('fundi:params', funDIParams, ins, cFun.name);
        }
        return funDIParams;
    }

    protected constructor() {
        super();
    }

    createChild(providers?: TypeProvider[]): FunctionDi {
        const fun = new FunctionDi();
        fun.THROW_Error = this.THROW_Error;
        fun.params = this.params;
        if (providers instanceof Array) {
            fun.push(providers);
        }
        return fun;
    }

    push(providers: Array<TypeProvider>) {
        for (const provider of providers) {
            if (provider.type && provider.useValue) {
                this.params.set(provider.type, provider.useValue);
            } else {
                this.debug(`provider (${provider}) hasn't prop 'type' or 'useValue`);
            }
        }
    }


    resolve(ins: any, cFun: Function): Object[] {
        const ret: any[] = [];

        const cFunParams: Parameter[] = FunctionDi.getFunctionParam(ins, cFun);

        for (const member of cFunParams) {
            if (this.params.has(member.type)) {
                ret.push(this.params.get(member.type));
            } else {
                if (this.THROW_Error) {
                    throw new Error(
                        `${ins.constructor.name}(${cFun.name}) -> ${member.type.name ? member.type.name : member.type} has no provider`);
                }
                ret.push({});
            }
        }

        return ret;
    }
}
