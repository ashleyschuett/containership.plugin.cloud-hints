var _ = require("lodash");
var request = require("request");

module.exports = {

    get_metadata: function(fn){

        var options = {
            url: "https://metadata.packet.net/metadata",
            method: "GET",
            timeout: 5000,
            json: true
        }

        request(options, function(err, response){
            if(err|| response.statusCode != 200)
                return fn();
            else{
                return fn({
                    id: response.body.id,
                    plan: response.body.plan,
                    facility: response.body.facility,
                    provider: "packet"
                });
            }
        });

    }

}
