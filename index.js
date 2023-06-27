require("dotenv").config({ path: __dirname + "/.env" });
const { TwitterApi } = require("twitter-api-v2");
const CronJob = require("cron").CronJob;
const express = require("express");

const app = express();

const client = new TwitterApi({
  appKey: process.env.API_KEY,
  appSecret: process.env.API_SECRET,
  accessToken: process.env.ACCESS_TOKEN,
  accessSecret: process.env.SECRET_TOKEN,
});

const twitterClient = client.readWrite;

const tweet = async () => {
  try {
    await twitterClient.v2.tweet("This is a new tweet after half an hour!");
  } catch (e) {
    console.log(e);
  }
};

const cronTweet = new CronJob("0 */30 * * * *", async () => {
  tweet();
});

cronTweet.start();

const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("home Page");
});

// Start the server
app.listen(port, () => {
  console.log("Server is running on port 3000");
});
