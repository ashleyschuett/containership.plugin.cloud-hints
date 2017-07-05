var os = require("os");

module.exports = {

    get_metadata: function(fn){
        if(os.release().indexOf("linode") != -1){
            return fn({
                provider: "linode"
            });
        }
        else
            return fn();
    }

}
