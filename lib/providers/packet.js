'use strict'

const _ = require('lodash');
const request = require('request');

module.exports = {

    get_metadata: function(fn) {

        const options = {
            url: 'https://metadata.packet.net/metadata',
            method: 'GET',
            timeout: 5000,
            json: true
        }

        return request(options, (err, response) => {
            if(err || response.statusCode != 200) {
                return fn(err || new Error('Request did not return 200.'));
            }

            return fn(null, {
                id: response.body.id,
                plan: response.body.plan,
                facility: response.body.facility,
                provider: 'packet'
            });
        });

    }

}
