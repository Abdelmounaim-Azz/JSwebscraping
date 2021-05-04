require("dotenv").config();
const Sheet = require("./utils/Sheet");
const Twitter = require("twitter");
(async function () {
  (async function () {
    const client = new Twitter({
      consumer_key: process.env.API_KEY,
      consumer_secret: process.env.API_SECRET_KEY,
      access_token_key: process.env.ACCESS_TOKEN,
      access_token_secret: process.env.ACCESS_TOKEN_SECRET,
    });
    const sheet = new Sheet();
    await sheet.load();
    const quotes = await sheet.getRows();
    const status = quotes[0].quote;
    client.post("statuses/update", {status}, function (error, tweet, response) {
      if (error) throw error;
      console.log(tweet); // Tweet body.
      console.log(response); // Raw response object.
    });
    await quotes[0].delete();
    console.log("tweeted", quotes[0].quote);
  })();
})();
