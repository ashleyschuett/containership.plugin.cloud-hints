'use strict';

const _ = require('lodash');
const async = require('async');
const request = require('request');

module.exports = {

    get_metadata: function(fn) {
        async.parallel({
            region: (fn) => {
                const options = {
                    url: 'http://169.254.169.254/latest/meta-data/placement/availability-zone',
                    method: 'GET',
                    timeout: 5000
                }

                return request(options, (err, response, body) => {
                    if(err) {
                        return fn(err);
                    }

                    if(response.statusCode !== 200) {
                        return fn(new Error(['Request returned status code:', response.statusCode].join(' ')));
                    }

                    return fn(null, body.slice(0, -1));
                });
            },

            availability_zone: function(fn){
                const options = {
                    url: 'http://169.254.169.254/latest/meta-data/placement/availability-zone',
                    method: 'GET',
                    timeout: 5000
                }

                return request(options, (err, response, body) => {
                    if(err) {
                        return fn(err);
                    }

                    if(response.statusCode !== 200) {
                        return fn(new Error(['Request returned status code:', response.statusCode].join(' ')));
                    }

                    return fn(null, body.slice(-1));
                });
            },

            instance_id: (fn) => {
                const options = {
                    url: 'http://169.254.169.254/latest/meta-data/instance-id',
                    method: 'GET',
                    timeout: 5000
                }

                return request(options, (err, response, body) => {
                    if(err) {
                        return fn(err);
                    }

                    if(response.statusCode !== 200) {
                        return fn(new Error(['Request returned status code:', response.statusCode].join(' ')));
                    }

                    return fn(null, body);
                });
            },

            instance_type: (fn) => {
                const options = {
                    url: 'http://169.254.169.254/latest/meta-data/instance-type',
                    method: 'GET',
                    timeout: 5000
                }

                return request(options, (err, response, body) => {
                    if(err) {
                        return fn(err);
                    }

                    if(response.statusCode !== 200) {
                        return fn(new Error(['Request returned status code:', response.statusCode].join(' ')));
                    }

                    return fn(null, body);
                });
            }
        }, (err, metadata) => {
            if (err) {
                return fn(err);
            }

            metadata.provider = 'lightsail';
            return fn(null, metadata);
        });
    }
}
