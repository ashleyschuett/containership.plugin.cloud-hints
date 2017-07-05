var _ = require("lodash");
var async = require("async");
var request = require("request");

module.exports = {

    get_metadata: function(fn){
        async.parallel({
            droplet_id: function(fn){
                var options = {
                    url: "http://169.254.169.254/metadata/v1/id",
                    method: "GET",
                    timeout: 5000
                }

                request(options, function(err, response){
                    if(err)
                        return fn(err);
                    else if(response.statusCode != 200)
                        return fn(new Error(["Request returned status code:", response.statusCode].join(" ")));
                    else
                        return fn(null, response.body);
                });
            },

            region: function(fn){
                var options = {
                    url: "http://169.254.169.254/metadata/v1/region",
                    method: "GET",
                    timeout: 5000
                }

                request(options, function(err, response){
                    if(err)
                        return fn(err);
                    else if(response.statusCode != 200)
                        return fn(new Error(["Request returned status code:", response.statusCode].join(" ")));
                    else
                        return fn(null, response.body);
                });
            }
        }, function(err, metadata){
            if(_.isUndefined(err)){
                metadata.provider = "digital_ocean";
                return fn(metadata);
            }
            else
                return fn();
        });
    }

}
