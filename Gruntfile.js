module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks

    grunt.initConfig({
        browserify: {
            dev: {
                options: {
                    browserifyOptions: {
                        debug: true
                    },
                    transform: [
                        ["babelify", {
                            sourceMap: true,
                            presets: ['es2015','react']
                        }]
                    ]
                },
                files: {
                    "build/app-debug.js": "src/app.jsx"
                }
            }
        },

        watch: {
            scripts: {
                files: "src/*.js?",
                tasks: ["browserify"]
            }
        }
    });

    grunt.registerTask('default', ['browserify']);
};
