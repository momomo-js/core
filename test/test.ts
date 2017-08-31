import {Controller} from '../src/decorator/controller';
import {Router} from '../src/decorator/router';
import {Instance} from '../src/decorator/instance';
import {MoInstance} from '../src/define/mo-instance.class';
import {MoServer} from '../src/bin/moserver';
import {ExpressServer} from '../../express/out/src/bin/express-server';

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

@Instance({
    servers: [],
    modules: [],
    routers: [IndexRouter],
    components: [],
    instance: {
        name: 'TEST',
        host: 'localhost',
        port: 3000
    }
})
class TestInstance {
}

new MoServer(TestInstance).startSever();
