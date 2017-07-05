'use strict';

const _ = require("lodash");
const async = require("async");
const request = require("request");

module.exports = {

    get_metadata: (callback) => {
        const default_options = {
            baseUrl: 'http://metadata.google.internal/computeMetadata/v1',
            method: 'GET',
            timeout: 5000,
            headers: {
                'Metadata-Flavor': 'Google'
            }
        }

        async.parallel({
            instance_id: (callback) => {
                const options = _.defaults({ url: '/instance/id' }, default_options);

                request(options, (err, response) => {
                    if(err) {
                        return callback(err);
                    } else if(response.statusCode != 200) {
                        return callback(new Error(`Request returned status code: ${response.statusCode}`));
                    } else {
                        return callback(null, response.body);
                    }
                });
            },

            region: (callback) => {
                const options = _.defaults({ url: '/instance/zone' }, default_options);

                request(options, (err, response) => {
                    if(err) {
                        return callback(err);
                    } else if(response.statusCode != 200) {
                        return callback(new Error(`Request returned status code: ${response.statusCode}`));
                    } else {
                        response.body = _.last(response.body.split('/'));
                        return callback(null, response.body.slice(0, -2));
                    }
                });
            },

            availability_zone: (callback) => {
                const options = _.defaults({ url: '/instance/zone' }, default_options);

                request(options, (err, response) => {
                    if(err) {
                        return callback(err);
                    } else if(response.statusCode != 200) {
                        return callback(new Error(`Request returned status code: ${response.statusCode}`));
                    } else {
                        response.body = _.last(response.body.split('/'));
                        return callback(null, response.body.slice(-1));
                    }
                });
            },

            instance_type: (callback) => {
                const options = _.defaults({ url: '/instance/machine-type' }, default_options);

                request(options, (err, response) => {
                    if(err) {
                        return callback(err);
                    } else if(response.statusCode != 200) {
                        return callback(new Error(`Request returned status code: ${response.statusCode}`));
                    } else {
                        return callback(null, _.last(response.body.split('/')));
                    }
                });
            },

            numeric_project_id: (callback) => {
                const options = _.defaults({ url: '/project/numeric-project-id' }, default_options);

                request(options, (err, response) => {
                    if(err) {
                        return callback(err);
                    } else if(response.statusCode != 200) {
                        return callback(new Error(`Request returned status code: ${response.statusCode}`));
                    } else {
                        return callback(null, response.body);
                    }
                });
            },

            project_id: (callback) => {
                const options = _.defaults({ url: '/project/project-id' }, default_options);

                request(options, (err, response) => {
                    if(err) {
                        return callback(err);
                    } else if(response.statusCode != 200) {
                        return callback(new Error(`Request returned status code: ${response.statusCode}`));
                    } else {
                        return callback(null, response.body);
                    }
                });
            }
        }, (err, metadata) => {
            if(!err) {
                metadata.provider = 'google_cloud';
                return callback(metadata);
            } else {
                return callback();
            }
        });
    }

}
