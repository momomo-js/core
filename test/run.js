require('ts-node').register({
    "compilerOptions": {
        "target": "es2016",
        "sourceMap": true,
        "experimentalDecorators": true,
        "emitDecoratorMetadata": true,
        "stripInternal": true,
        "declaration": true
    },
    "exclude": [
        "node_modules"
    ]
});

require('./test4');
/**
 * Created by yskun on 2017/5/16.
 */
