'use strict';

const fs = require('fs');

const DOCKER_ENV_PATH = '/.dockerenv';
let FILE_PATH = '/lib/smartdc';

module.exports = {

    get_metadata: (callback) => {

        return fs.stat(DOCKER_ENV_PATH, (err, stats) => {
            if(!err && stats) {
                FILE_PATH = `/rootfs${FILE_PATH}`;
            }

            return fs.stat(FILE_PATH, (err, stats) => {
                if(err) {
                    return callback(err);
                }
                return callback(null, {
                    provider: 'joyent'
                });
            });
        });
    }

}
