import 'reflect-metadata';
import {Router} from "../src/decorator/router";
import {Controller} from "../src/decorator/controller";
import {RouterInterface} from "../src/define/router.class";
import {METHOD, PATH} from "../src/decorator/symbol";
import {Method} from "../src/decorator/method";
class IndexModel {
    test: string;
    haha: string;
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

let q =new IndexRouter() as RouterInterface;

let t = q.controllers.pop();

let c = Reflect.getMetadata(PATH,t);
console.log(c);
let r =1;