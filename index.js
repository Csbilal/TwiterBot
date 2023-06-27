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

const tweet = async (res) => {
  try {
    const response = await twitterClient.v2.tweet(
      "is  this is a new tweet on Twitter from the server "
    );
    res.send(response); // Send the successful response back to the server
  } catch (e) {
    console.error(e);
    res.status(500).send(e.message); // Send the error message back to the server
  }
};

const cronTweet = new CronJob("0,30 * * * *", async () => {
  tweet();
});

cronTweet.start();

const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("home Page");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
