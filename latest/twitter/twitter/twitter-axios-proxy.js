module.exports = function(RED) {
    //var Ntwitter = require('twitter-ng');
    //var axios = require('axios');
    //var crypto = require('crypto');
    function TwitterCredentialAxiosNode(config) {
        RED.nodes.createNode(this, config);
        var  node = this;
        node.on('input',function(msg){
            msg.payload = msg.payload.toLowerCase();
            node.send(msg);
        });
    }
    RED.nodes.registerType("twitter-axios-proxy",TwitterCredentialAxiosNode);
}
