'use strict';

const providers = require("./providers");

const fs = require("fs");
const _ = require("lodash");
const async = require("async");

module.exports = {

    get_hints: function(core, config) {
        let cloud = {};
        const provider_name = config && config.provider;

        const get_provider_hints = (provider_name, fn) => {
            const provider = providers[provider_name];
            provider.get_metadata(function(attributes){
                if(!_.isUndefined(attributes)) {
                    cloud = attributes;
                }

                return fn();
            });
        }

        const set_attributes = () => {
            var attributes = core.cluster.legiond.get_attributes();
            core.cluster.legiond.set_attributes({
                tags: _.defaults({
                    cloud: cloud
                }, attributes.tags)
            });
        }

        if(provider_name && providers[provider_name]) {
            return get_provider_hints(provider_name, set_attributes);
        }

        return async.each(_.keys(providers), function(provider, fn) {
            get_provider_hints(provider, fn);
        }, set_attributes);
    }
}
