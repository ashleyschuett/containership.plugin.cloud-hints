var _ = require("lodash");
var async = require("async");
var request = require("request");

module.exports = {

    is_true: function(fn){
        async.parallel({
            region: function(fn){
                var options = {
                    url: "http://100.100.100.200/latest/meta-data/region-id",
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

            availability_zone: function(fn){
                var options = {
                    url: "http://100.100.100.200/latest/meta-data/zone-id",
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

            instance_id: function(fn){
                var options = {
                    url: "http://100.100.100.200/latest/meta-data/instance-id",
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

            serial_number: function(fn){
                var options = {
                    url: "http://100.100.100.200/latest/meta-data/serial-number",
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
                metadata.provider = "alibaba_cloud";
                return fn(metadata);
            }
            else
                return fn();
        });
    }

}
