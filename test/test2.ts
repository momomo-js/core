import 'reflect-metadata';
import {ReflectiveInjector, Injectable, Injector} from 'injection-js';
import {Router} from "../src/decorator/router";
import {Controller} from "../src/decorator/controller";
import construct = Reflect.construct;
import {MoServer} from "../src/bin/moserver";
import {IRouter} from "../src/define/router.interface";

@Injectable()
class Http {

}

@Injectable()
class TestService {
    constructor(http: Http) {

    }

    test() {
        console.log(`run in ${TestService.name}`);
    }
}

@Injectable()
class TestService2 {
    constructor(http: Http) {
    }

    test() {
        console.log(`run in ${TestService2.name}`);
    }
}


@Controller()
class HahaController {
    constructor(private test: TestService,
                private test2: TestService2) {
        this.find();
    }

    find() {
        this.test.test();
        this.test2.test();

    }
}

@Router({
    services: [
        TestService
    ],
    controllers: [
        HahaController
    ]
})
class RootRouter {
    test()
    {
        console.log(`run in ${RootRouter.name}`);

    }
}

let service = new MoServer();

service.routerManager.addRouter([RootRouter]);
service.routerManager.addService([TestService2,Http]);

service.startSever();

