import {Controller} from '../src/decorator/controller';
import {Router} from '../src/decorator/router';
import {Instance} from '../src/decorator/instance';
import {Mo} from '../src/mo';
import {Server} from '../src/decorator/server';
import {Injectable} from 'injection-js';
import {OnInit} from '../src/define/mo-cycle-life.interface';
import {PluginPackage} from '../src/decorator/plugin-package';
import {MoServerPlugin} from '../src/define/mo-server-plugin.interface';
import {Plugin} from '../src/decorator/plugin';
import {TARGET} from '../src/decorator/symbol';
import {MoBasic} from '../src/define/mo-basic.class';

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
class TestServer extends MoBasic implements OnInit, MoServerPlugin {
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


Mo
    .create(TestInstance)
    .then(value => value.startSever());
