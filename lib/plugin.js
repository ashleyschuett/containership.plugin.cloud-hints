'use strict';

const cloud_hints = require('./cloud-hints');

const _ = require('lodash');
const { ContainershipPlugin } = require('@containership/containership.plugin');

class ContainershipCloudHintsPlugin extends ContainershipPlugin {

    constructor() {
        super({
            name: 'cloud-hints',
            description: 'A plugin to fetch cloud metadata from host.',
            types: ['core']
        });
    }

    startLeader(host) {
        super.startLeader(host);

        return cloud_hints.get_hints(this.config.core, (err, hints) => {
            if (err) {
                return console.error(err);
            }

            const orchestrator = host.getOrchestrator();

            if (orchestrator === 'containership') {
                const attributes = host.core.cluster.legiond.get_attributes();
                return host.core.cluster.legiond.set_attributes({
                    tags: _.defaults({
                        cloud: hints
                    }, attributes.tags)
                });
            } else if (orchestrator === 'kubernetes') {
                // we don't have a k8s node representing the leader so there is nowhere to save the tags
                return console.info('We do not update leader node tags in kubernetes');
            } else {
                console.error(`The host orchestrator is not supported: ${orchestrator}!`);
            }
        });
    }

    startFollower(host) {
        super.startFollower(host);

        return cloud_hints.get_hints(this.config.core, (err, hints) => {
            if (err) {
                return console.error(err);
            }

            const orchestrator = host.getOrchestrator();

            if (orchestrator === 'containership') {
                const attributes = host.core.cluster.legiond.get_attributes();
                return host.core.cluster.legiond.set_attributes({
                    tags: _.defaults({
                        cloud: hints
                    }, attributes.tags)
                });
            } else if (orchestrator === 'kubernetes') {
                const api = host.getApi();

                return api.getHost(host.getID(), (err, cs_host) => {
                    if (err) {
                        console.error('Failed to add cloud hint tags to host');
                        return console.error(err);
                    }

                    const tags = _.defaults({
                        cloud: hints
                    }, cs_host.tags);

                    return api.updateHost(host.getID(), tags, (err, data) => {
                        if (err) {
                            console.error('Failed to add cloud hint tags to host');
                            return console.error(err);
                        }
                    });
                });
            } else {
                console.error(`The host orchestrator is not supported: ${orchestrator}!`);
            }
        });
    }
}

module.exports = ContainershipCloudHintsPlugin;
