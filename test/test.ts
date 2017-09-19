import {Controller} from '../src/decorator/controller';
import {Router} from '../src/decorator/router';
import {Instance} from '../src/decorator/instance';
import {MoServer} from '../src/bin/moserver';
import {Server} from '../src/decorator/server';
import {Injectable} from 'injection-js';
import {OnInit} from '../src/define/mo-cycle-life.interface';
import {PluginPackage} from '../src/decorator/plugin-package';
import {MoBasicServer} from '../src/define/mo-server.class';
import {Plugin} from '../src/decorator/plugin';
import {TARGET} from '../src/decorator/symbol';

@Controller({
    path: '/'
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



@Injectable()
class TestServer extends MoBasicServer implements OnInit {
    addPlugin(Package: any): void {
        this.debug(Package);
    }
    onInit(): void {

    }
}



@Injectable()
class TestComponent {
    constructor(test: TestServer) {
    }
}

@Server({
    components: [TestComponent],
    main: TestServer
})
class TestM {
}

@PluginPackage(TestM)
class TestPluginPackage {
    hahaha = `hahahah`;
    @Plugin(Symbol('haha'))
    test() {
        console.log(this.hahaha);
    }
}


@Instance({
    servers: [TestM],
    modules: [],
    routers: [IndexRouter],
    components: [],
    plugins: [TestPluginPackage],
    instance: {
        name: 'TEST',
        host: 'localhost',
        port: 3000
    }
})
class TestInstance {
}



MoServer
    .create(TestInstance)
    .then(value => value.startSever());
