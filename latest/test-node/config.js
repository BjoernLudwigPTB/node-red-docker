module.exports = {
    consumer_key: process.env.TWITTER_API_KEY,
    consumer_secret: process.env.TWITTER_SECRET_API_KEY,
    access_token: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_SECRET_ACCESS_TOKEN,
    proxy: "http://webproxy.bs.ptb.de:8080"
}

//exports the credentials and the proxy to use for tweeting and parsing the twitter API