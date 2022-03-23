const twitterRestClient = require('./twitterRestClient');

async function getTimeline(screen_name, count) {
    const path = `/statuses/user_timeline.json?screen_name=${screen_name}&count=${count}`;
    const response = await twitterRestClient.makeRequest(path, 'GET');

    return response.data;
}

module.exports = {
    getTimeline,
}
