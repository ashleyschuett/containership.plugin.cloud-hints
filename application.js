'use strict';

const cloud_hints = require('./cloud-hints');

const ContainershipPlugin = require('containership.plugin');

module.exports = new ContainershipPlugin({
    type: 'core',

    runLeader: function(core) {
        cloud_hints.get_hints(core);
    },

    runFollower(core) {
        cloud_hints.get_hints(core);
    },

    initialize: function(core){
        if(core.options.mode === 'leader') {
            return module.exports.runLeader(core);
        }

        return module.exports.runFollower(core);
    },

    reload: function(){}
});
