'use strict';

const _ = require("lodash");
const async = require("async");
const request = require("request");

module.exports = {

    get_metadata: (fn) => {
        const default_options = {
            baseUrl: 'http://metadata.google.internal/computeMetadata/v1',
            method: 'GET',
            timeout: 5000,
            headers: {
                'Metadata-Flavor': 'Google'
            }
        }

        async.parallel({
            instance_id: (fn) => {
                const options = _.defaults({ url: '/instance/id' }, default_options);

                return request(options, (err, response, body) => {
                    if(err) {
                        return fn(err);
                    }

                    if(response.statusCode != 200) {
                        return fn(new Error(['Request returned status code:', response.statusCode].join(' ')));
                    }

                    return fn(null, body);
                });
            },

            region: (fn) => {
                const options = _.defaults({ url: '/instance/zone' }, default_options);

                return request(options, (err, response, body) => {
                    if(err) {
                        return fn(err);
                    }

                    if(response.statusCode != 200) {
                        return fn(new Error(['Request returned status code:', response.statusCode].join(' ')));
                    }

                    return fn(null, body);
                });
            },

            availability_zone: (fn) => {
                const options = _.defaults({ url: '/instance/zone' }, default_options);

                return request(options, (err, response, body) => {
                    if(err) {
                        return fn(err);
                    }

                    if(response.statusCode != 200) {
                        return fn(new Error(['Request returned status code:', response.statusCode].join(' ')));
                    }

                    return fn(null, body);
                });
            },

            instance_type: (fn) => {
                const options = _.defaults({ url: '/instance/machine-type' }, default_options);

                return request(options, (err, response, body) => {
                    if(err) {
                        return fn(err);
                    }

                    if(response.statusCode != 200) {
                        return fn(new Error(['Request returned status code:', response.statusCode].join(' ')));
                    }

                    return fn(null, body);
                });
            },

            numeric_project_id: (fn) => {
                const options = _.defaults({ url: '/project/numeric-project-id' }, default_options);

                return request(options, (err, response, body) => {
                    if(err) {
                        return fn(err);
                    }

                    if(response.statusCode != 200) {
                        return fn(new Error(['Request returned status code:', response.statusCode].join(' ')));
                    }

                    return fn(null, body);
                });
            },

            project_id: (fn) => {
                const options = _.defaults({ url: '/project/project-id' }, default_options);

                return request(options, (err, response, body) => {
                    if(err) {
                        return fn(err);
                    }

                    if(response.statusCode != 200) {
                        return fn(new Error(['Request returned status code:', response.statusCode].join(' ')));
                    }

                    return fn(null, body);
                });
            }
        }, (err, metadata) => {
            if (err) {
                return fn(err);
            }

            metadata.provider = 'google_cloud';
            return fn(null, metadata);
        });
    }

}
