const dotenv = require('dotenv');
dotenv.config({ path: '.env' });

const config = {
    twitterAPIConfig: {
        basePath: process.env.TWITTER_API_BASE_PATH,
        bearerToken: process.env.TWITTER_API_BEARER_TOKEN,
    }
}

module.exports = {
    config
}
