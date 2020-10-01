module.exports = function(RED){
    const unirest = require('unirest');
        function TwitterCrendentialNode(config) {
        RED.nodes.createNode(this, config);
        this.prefix=config.prefix;

        var node = this;
        var request = '';
        
        node.on('input', function(msg) {
            msg.prefix=this.prefix;
            request = unirest("GET",'http://mockbin.com/request');
            request.proxy('http://webproxy.bs.ptb.de:8080');
            msg.payload = "Get Request executed";
            msg.request = request;
            request.end( response=>{
                msg.payload=response;
                node.send(msg);
            });
            
        });

    }
    RED.nodes.registerType("credential-node",TwitterCrendentialNode,{
        credentials: {
            consumer_key: {type: "password"},
            consumer_secret : { type:"password"},
            access_token: {type:"password"},
            acces_token_secret: {type: "password"}
        }
    });
}