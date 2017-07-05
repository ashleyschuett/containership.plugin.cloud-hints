'use strict';

const providers = require('./providers');

const _ = require('lodash');
const async = require('async');
const fs = require('fs');

module.exports = {

    get_hints: function(config, cb) {
        const provider_name = _.get(config, 'provider');
        let cloud_hints;

        const get_provider_hints = (provider_name, fn) => {
            const provider = providers[provider_name];

            provider.get_metadata((err, attrs) => {
                if (err) {
                    return fn(null, false);
                }

                cloud_hints = attrs;
                return fn(null, true);
            });
        }

        if(provider_name && providers[provider_name])) {
            return get_provider_hints(provider_name, (err) => {
                return cb(err, cloud_hints);
            });
        }

        return async.some(_.keys(providers), function(provider, fn) {
            return get_provider_hints(provider, fn);
        }, (err) => {
            return cb(err, cloud_hints);
        });
    }
};
