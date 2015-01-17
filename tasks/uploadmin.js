'use strict';
module.exports = function(grunt){
    var path = require('path'),
        chalk = require('chalk'),
        uploader = require('./lib/uploader');


    grunt.registerMultiTask('uploadmin', 'Upload .min files to the JsLog.me service', function(){
        function uploadSingleFile(filepath) {
            if (!grunt.file.exists(filepath)) {
                grunt.log.warn('Source file "' + filepath + '" not found.');
                return;
            }
            if (grunt.file.isDir(filepath)) {
                return;
            }
            if (options.onlyMap && (path.extname(filepath) !== '.map')) {
                grunt.log.warn('Ignoring "' + filepath + '"');
                return;
            }
            // Read file source.
            var content = grunt.file.read(filepath);
            requests++;
            counter++;
            uploader.upload(options.apiToken, options.projectUuid, options.version, filepath, content,
                function(){
                    requests--;
                    // Success
                    grunt.log.writeln('File ' + chalk.cyan(filepath) + ' uploaded.');
                    // All done?
                    checkForCompletion();
                },
                function(){
                    requests--;
                    success = false;
                    // Fail
                    grunt.log.writeln('File ' + chalk.cyan(filepath) + ' failed to upload.');
                    // All done?
                    checkForCompletion();
                }
            );
        }
        function checkForCompletion(){
            if (!requests && (length === counter)) {
                done(success);
            }
        }

        var requests,
            counter,
            length,
            success = true,
            done = this.async();

        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            apiToken: null,
            projectUuid: null,
            version: '',
            onlyMap: true
        });

        if (!options.apiToken) {
            grunt.log.error('API token is not set');
        }

        if (!options.projectUuid) {
            grunt.log.error('Project UUID is not set');
        }

        // Iterate over all src-dest file pairs.
        requests = 0;
        counter = 0;
        length = this.files.length;
        this.files.forEach(function(files) {
            files.src.forEach(function(filepath){
                uploadSingleFile(filepath);
            });
        });
    });
};