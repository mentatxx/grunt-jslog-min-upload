# grunt-jslog-min-upload
Grunt task to upload .min files to JsLog.me service

## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-jslog-min-upload --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-jslog-min-upload');
```

*This plugin was designed to work with Grunt 0.4.x. If you're still using grunt v0.3.x it's strongly recommended that [you upgrade](http://gruntjs.com/upgrading-from-0.3-to-0.4), but in case you can't please use [v0.3.2](https://github.com/gruntjs/grunt-contrib-copy/tree/grunt-0.3-stable).*

## uploadmin task
Upload generated ```.map``` files to JsLog.me service. 

When you build for production, along with minifying and combining your JavaScript files, you generate a source map which holds information about your original files. When you query a certain line and column number in your generated JavaScript you can do a lookup in the source map which returns the original location. Using ```grunt-jslog-min-upload``` lets you view JavaScript stacktraces with original locations. 

### Options

* apiToken - API token for JsLog.me user
* projectUuid - UUID of project
* version - application version (optional, default empty)
* onlyMap - upload only files with .map extension (optional, default ```true```)

To get API token and project UUID visit "Project settings" page. Dashboard -> Project -> Settings

![JsLog.me Project Settings button](http://p.3cam.ru/up/07d29e9d5e4d8e69f667377eff5e2ce5.png)

## Usage example

```
/*global module, require*/

module.exports = function (grunt) {
    //
    require('load-grunt-tasks')(grunt,{
        pattern: ['grunt-*', '!grunt-template-jasmine-requirejs']
    });
    //
    grunt.initConfig({
        uglify: {
            jslog: {
                options: {
                    sourceMap: true,
                    compress: true
                },
                files: {
                    'dist/jslog.min.js': ['js/jslog.js']
                }
            }
        },
        uploadmin: {
            jslog: {
                options: {
                    apiToken: '<YOUR API TOKEN HERE>',
                    projectUuid: '<YOUR PROJECT UUID TOKEN HERE>'
                },
                src: ['dist/*.map']
            }
        }
    });

    grunt.registerTask('default', ['uglify:jslog', 'uploadmin']);
};
```
