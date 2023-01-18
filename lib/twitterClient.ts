import TwitterApi from 'twitter-api-v2';

// Twitter API init
const { CLIENT_ID, CLIENT_SECRET, BASE_URL } = process.env;
if (!CLIENT_ID || !CLIENT_SECRET)
  throw new Error('No client id, secret or base url');
export const twitterClient = new TwitterApi({
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
});
