'use strict';

const cloud_hints = require('./cloud-hints');

const ContainershipPlugin = require('containership.plugin');

module.exports = new ContainershipPlugin({
    type: 'core',
    name: 'cloud-hints',

    runLeader: function(core, config) {
        cloud_hints.get_hints(core, config);
    },

    runFollower: function(core, config) {
        cloud_hints.get_hints(core, config);
    },

    initialize: function(core){
        if(!core || !core.logger) {
            return console.warn('This plugin does not include any CLI support');
        }

        const config = this.get_config('core');
        if(core.options.mode === 'leader') {
            return module.exports.runLeader(core, config);
        } else if (core.options.mode === 'follower') {
            return module.exports.runFollower(core, config);
        } else if (core.logger) {
            core.logger.register('cloud-hints-plugin');
            return core.loggers['cloud-hints-plugin'].log('error', 'Invalid configuration found when stopping containership cloud-hints plugin!');
        }
    },

    reload: function(){}
});
