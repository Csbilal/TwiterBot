require("dotenv").config({ path: __dirname + "/.env" });
const { TwitterApi } = require("twitter-api-v2");
const CronJob = require("cron").CronJob;

const client = new TwitterApi({
  appKey: process.env.API_KEY,
  appSecret: process.env.API_SECRET,
  accessToken: process.env.ACCESS_TOKEN,
  accessSecret: process.env.SECRET_TOKEN,
});

// const bearer = new TwitterApi(process.env.BEARER_TOKEN);

const twitterClient = client.readWrite;
// const twitterBearer = bearer.readOnly;

const tweet = async () => {
  try {
    await twitterClient.v2.tweet("another post");
  } catch (e) {
    console.log(e);
  }
};
// tweet();

// const getUser = async () => {
//   try {
//     const res = await twitterClient.v2.user("Muhammad Bilal");
//     console.log(res, "user");
//   } catch (e) {
//     ussr;
//     console.log(e);
//   }
// };

// getUser();

const cronTweet = new CronJob("10 1 * * *", async () => {
  tweet();
});

cronTweet.start();
