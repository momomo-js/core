/**
 * Created by yskun on 2017/4/18.
 */
var ts = require('./tsconfig.json');
ts.compilerOptions.declaration= true;

module.exports = function (grunt) {
    grunt.initConfig({
        ts: {
            default: {
                src: ["**/*.ts", "!node_modules/**", "!test/**"],
                options: ts.compilerOptions
            },
            publish: {
                src: ["**/*.ts", "!node_modules/**", "!test/**"],
                options: ts.compilerOptions,
                outDir: 'out'
            }
        },
        clean: {
            default: {
                src: ['**/*.d.ts', '**/*.js', '**/*.js.map', '!node_modules/**', '!Gruntfile.js', '!test/**', '.tscache']
            },
            publish: {
                src: ['out/*','!out/.git']
            }
        },
        copy: {
            publish: {
                files: [
                    {extends:true,src:['package.json','README.md','LICENSE'],dest: 'out/'}
                ]
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks("grunt-ts");
    grunt.registerTask("default", ["clean:default", "ts:default"]);
    grunt.registerTask("publish", ["clean:publish", "ts:publish","copy:publish"]);



};