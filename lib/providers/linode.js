'use strict';

const os = require('os');

module.exports = {

    get_metadata: function(fn) {
        if(os.release().indexOf('linode') === -1) {
            return fn(new Error('os release does not container linode.'));
        }

        return fn(null, { provider: 'linode' });
    }

}
