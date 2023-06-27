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
    const response = await twitterClient.v2.tweet(
      "a new tweet on twiiter from the server"
    );
    return response; // Return the successful response
  } catch (e) {
    console.error(e);
    throw e; // Rethrow the error
  }
};

const cronTweet = new CronJob("0 */2 * * * *", async () => {
  try {
    const response = await tweet();
    console.log(`Tweet sent successfully: ${response.data.text}`);
  } catch (error) {
    console.error(`Error sending tweet: ${error.message}`);
  }
});

cronTweet.start();

const port = process.env.PORT || 8080;

app.get("/", async (req, res) => {
  try {
    const response = await tweet();
    res.send(response); // Send the successful response back to the server
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message); // Send the error message back to the server
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
