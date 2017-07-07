require('ts-node').register({
    "compilerOptions": {
        "module": "es2015",
        "target": "es2016",
        "sourceMap": true,
        "experimentalDecorators": true,
        "emitDecoratorMetadata": true,
        "stripInternal": true,
        "declaration": true,
        "lib": ["es2015", "dom"]
    },
    "exclude": [
        "node_modules"
    ]
});

require('./index.ts');
/**
 * Created by yskun on 2017/5/16.
 */
