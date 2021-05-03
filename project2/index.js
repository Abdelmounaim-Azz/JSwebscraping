require("dotenv").config();
const Sheet = require("./utils/Sheet");
const Twitter = require("twitter");
(async function () {
  const client = new Twitter({
    consumer_key: process.env.API_KEY,
    consumer_secret: process.env.API_SECRET_KEY,
    access_token_key: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  });
  const sheet = new Sheet();
  await sheet.load();
  const rows = await sheet.getRows();
  const status = rows[0].quote;
  client.post("statuses/update", {status}, function (error, tweet, response) {
    if (error) throw error;
    console.log(tweet); // Tweet body.
    console.log(response); // Raw response object.
  });
})();
