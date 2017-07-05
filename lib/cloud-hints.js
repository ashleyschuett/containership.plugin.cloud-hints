'use strict';

const _ = require('lodash');
const async = require('async');
const fs = require('fs');

module.exports = {

    get_hints: function(config, cb) {
        const provider_name = _.get(config, 'provider');
        const providers = fs.readdirSync(`${__dirname}/providers`);
        let cloud_hints;

        const get_provider_hints = (provider_name, fn) => {
            const provider = require([__dirname, "providers", provider_name].join("/"));
            provider.is_true((err, is_true, attrs) => {
                if (is_true) {
                    cloud_hints = attrs;
                    return fn(null, true);
                }

                return fn(null, false);
            });
        }

        const set_attributes = () => {
            return cb(err, cloud_hints);
        }

        const provider_file = `${provider_name}.js`;
        if(provider_name && _.include(providers, provider_file)) {
            return get_provider_hints(provider_file, (err) => {
                return cb(err, cloud_hints);
            });
        }

        return async.some(providers, function(provider, fn) {
            return get_provider_hints(provider, fn);
        }, (err) => {
            return cb(err, cloud_hints);
        });
    }
};
