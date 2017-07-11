import 'reflect-metadata';
import {Router} from "../src/decorator/router";
import {Controller} from "../src/decorator/controller";
import {RouterInterface} from "../src/define/router.class";
import {METHOD, PATH} from "../src/decorator/symbol";
import {Method} from "../src/decorator/method";
import {Plugin} from "../src/decorator/plugin";
import {MoServer} from "../src/bin/moserver";
import {MoBasicServer} from "../src/define/mo-server.class";


class IndexModel {
    test: string = '';
    @Plugin(Symbol("y"))
    haha: string;

    @Plugin(Symbol("y"))
    fun()
    {

    }
}

@Controller({
    models:[
        IndexModel
    ],
    path:'/'
})
class IndexController {
    @Method(METHOD)
    index()
    {

    }

}



@Router({
    controllers: [
        IndexController
    ]
})
class IndexRouter {
}

// let q =new IndexRouter() as RouterInterface;
//
// let t = q.controllers.pop();
//
// let c = Reflect.getMetadata(PATH,t);
// console.log(c);

let symbol = Symbol("y");

class PluginPackage {

    @Plugin(symbol)
    hahah:String = '1';

    @Plugin(symbol)
    func()
    {

    }
}
let p = new PluginPackage();

class TestServer extends MoBasicServer {
    start(): void {
        let plugin = MoBasicServer.getPlugin(p,symbol);
        console.log(plugin);
    }

    init(): void {
    }

}

