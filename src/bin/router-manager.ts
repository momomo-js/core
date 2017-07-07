import {MoApplication} from "../define/mo-application.class";
import {RouterInterface} from "../define/router.class";
import {ControllerInterface} from "../define/controller.interface";

export class RouterManager extends MoApplication {
    private routerList: RouterInterface[];
    private _controllerList:ControllerInterface[];

    constructor() {
        super();
        this.routerList = [];

    }

    addRouter(router:typeof Object)
    {
        let rIns = new router() as RouterInterface;
        for(let r of this.routerList)
        {
            if(r.constructor.name == rIns.constructor.name)
            {
                return;
            }
        }

        this.routerList.push(rIns as RouterInterface);
        this._controllerList.push(...rIns.controllers);
    }

    delRouter(router:typeof Object)
    {

        for(let i = 0; i< this.routerList.length; i++)
        {
            if(this.routerList[i].constructor.name == router.constructor.name)
            {
                this.routerList.splice(i,i);
                return;
            }
        }

        this.refreshControllerList();
    }

    refreshControllerList()
    {
        this._controllerList = [];
        for(let r of this.routerList)
        {
            let router = r as RouterInterface;
            this._controllerList.push(...router.controllers);
        }
    }

    get controllerList():ControllerInterface[]
    {
        return this._controllerList;
    }
}

/**
 * Created by yskun on 2017/7/5.
 */
