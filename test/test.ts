import 'reflect-metadata';
import {Router} from "../src/decorator/router";
import {Controller} from "../src/decorator/controller";
import {RouterInterface} from "../src/define/router.class";
class IndexModel {
    test: string;
    haha: string;
}

@Controller({
    models:[
        IndexModel
    ]
})
class IndexController {

}



@Router({
    controllers: [
        IndexController
    ]
})
class IndexRouter {
}

let q =new IndexRouter() as RouterInterface;

let t = q.controllers.pop().modelList.get("IndexModel");
let r =1;