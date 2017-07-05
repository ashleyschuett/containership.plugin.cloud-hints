'use strict';

const fs = require('fs');

const DOCKER_ENV_PATH = '/.dockerenv';
let FILE_PATH = '/etc/cloud/cloud.cfg.d/99-rackspace-general.cfg';

module.exports = {

    get_metadata: function(callback) {
        return fs.stat(DOCKER_ENV_PATH, (err, stats) => {
            if(!err && stats) {
                FILE_PATH = `/rootfs${FILE_PATH}`;
            }

            return fs.stat(FILE_PATH, (err, stats) => {
                if(err) {
                    return callback(err);
                }

                return callback(null, {
                    provider: 'rackspace'
                });
            });
        });
    }

}
