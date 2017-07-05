var _ = require("lodash");
var async = require("async");
var request = require("request");

module.exports = {

    is_true: function(fn){
        async.parallel({
            region: function(fn){
                var options = {
                    url: "http://169.254.169.254/latest/meta-data/placement/availability-zone",
                    method: "GET",
                    timeout: 5000
                }

                request(options, function(err, response){
                    if(err)
                        return fn(err);
                    else if(response.statusCode != 200)
                        return fn(new Error(["Request returned status code:", response.statusCode].join(" ")));
                    else
                        return fn(null, response.body.slice(0, -1));
                });
            },

            availability_zone: function(fn){
                var options = {
                    url: "http://169.254.169.254/latest/meta-data/placement/availability-zone",
                    method: "GET",
                    timeout: 5000
                }

                request(options, function(err, response){
                    if(err)
                        return fn(err);
                    else if(response.statusCode != 200)
                        return fn(new Error(["Request returned status code:", response.statusCode].join(" ")));
                    else
                        return fn(null, response.body.slice(-1));
                });
            },

            instance_id: function(fn){
                var options = {
                    url: "http://169.254.169.254/latest/meta-data/instance-id",
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

            instance_type: function(fn){
                var options = {
                    url: "http://169.254.169.254/latest/meta-data/instance-type",
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
                metadata.provider = 'lightsail';
                return fn(metadata);
            }
            else
                return fn();
        });
    }
}
