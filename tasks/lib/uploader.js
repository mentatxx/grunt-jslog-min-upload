var rest = require('restler'),
    path = require('path'),
    URL = 'http://alpha.jslog.me/api/sourcemap';

function jsLogSourceMapUpload(apiToken, projectUuid, version, file, content, success, fail) {
    var headers = {
            'Accept': '*/*',
            'User-Agent': 'Grunt sourcemap uploader',
            'X-Auth-Token': apiToken
        },
        options = {
            data: content,
            headers: headers
        };
    if (version==='') {
        version = '*';
    }
    var baseFileName = path.basename(file);
    if (!projectUuid) {
        throw new Error("Project UUID is not specified");
    }
    if (!projectUuid) {
        throw new Error("File is not specified");
    }
    rest.post(URL+'/'+projectUuid+'/'+version+'/'+baseFileName, options).
        on('success', success).
        on('error', fail);
}


module.exports = {
    upload: jsLogSourceMapUpload
};