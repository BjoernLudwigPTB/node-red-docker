const credentials = require('./config');
const twitter= require('../twit');
const TwitterObj=new twitter(credentials);

getTweetsForTopic('Metrology');
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
        if(!err){
            for(let dat of foundTweets){
                console.log(dat)
                

            }
        }
        else if(err){
            console.log(err);
            
        }
        
    })
}
