module.exports = function(RED) {
    const credentials = require('./config');
    const twitter= require('./twit');
    const TwitterObj=new twitter(credentials);
    function TestNode(config) {
        RED.nodes.createNode(this, config);
        var  node = this;
        node.on('input',function(msg){
            msg.tweet=getTweetsForTopic("Metrology");
            //msg.payload = msg.payload.toUpperCase();
            node.send(msg);
        });
    }
    
    function getTweetsForTopic(topic)
    {
    let params = {
        q: topic, 
        result_type: 'recent',
        count:10
    };
    TwitterObj.get('search/tweets', params, (err,data,response)=> 
    {
        let foundTweets = data.statuses;
        console.log(data)
        return data;
        if(!err){
            return data;
            for(let dat of foundTweets){
                console.log(dat)
                return

            }
        }
        else if(err){
            console.log(err);
            return err;
        }
        
    })
}
    RED.nodes.registerType("test-node",TestNode);}