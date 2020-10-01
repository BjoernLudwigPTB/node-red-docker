const request = require('request');
const unirest = require('unirest');
const credentials = require('./config');
// Use the local twit package until pullrequest is accepted
const twitter = require('./twit');


module.exports = function (RED) {
    const TwitterObj = new twitter(credentials);


    function TwitterSearchNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        // config ist retrieved from the input in the configuration file
        this.keywords= config.keywords;
        this.frequency = config.frequency;

                
        node.on('input', function (msg) {
            
            // define the params for the query on Twitter.
            
            let params = {
                q: this.keywords,
                result_type: 'recent',
                count: 10
            };
            msg.topic=this.keywords;
            msg.config=this.config;
            var response_data='';
            var request_response= '';
            (TwitterObj.get('search/tweets', params, (err, data, response) => {
                response_data = data;
                request_response = response;
                msg.data= response_data
                msg.response=response;
                msg.payload=response_data.statuses;                   

                if (!err) {
                    
                   }
                else if (err) {
                    msg.error=err;
                }
                // instead of return statement, API call is assynchronous
                node.send(msg);

            }))
            
            return;
        });
    }
    RED.nodes.registerType("twitter-search-node", TwitterSearchNode, {
        credentials: {
            consumer_key: { type: "password" },
            consumer_secret: { type: "password" },
            access_token: { type: "password" },
            acces_token_secret: { type: "password" }
        }
    });
}