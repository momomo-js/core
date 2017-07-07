/**
 * Created by yskun on 2017/4/18.
 */

module.exports = function (grunt) {
    grunt.initConfig({
        ts: {
            default: {
                src: ["**/*.ts", "!node_modules/**", "!test/**"],
                options: {
                    module: 'commonjs',
                    declaration: true,
                    target: 'es6'
                }
            }
        },
        clean: {
            build: {
                src: ['**/*.d.ts', '**/*.js', '**/*.js.map','!node_modules/**', '!Gruntfile.js', '!test/**','.tscache']
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks("grunt-ts");
    grunt.registerTask("default", ["clean", "ts"]);

};