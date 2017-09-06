import {Controller} from '../src/decorator/controller';
import {Router} from '../src/decorator/router';
import {Instance} from '../src/decorator/instance';
import {MoServer} from '../src/bin/moserver';

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
    plugins: [],
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
