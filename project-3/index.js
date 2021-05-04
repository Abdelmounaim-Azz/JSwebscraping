const fetch = require("node-fetch");
const cheerio = require("cheerio");

(async function () {
  const data = await fetch("https://explodingtopics.com/topics-this-month");
  const text = await data.text();
  const $ = cheerio.load(text);
  const topicTitle = $(".tileKeyword").text();
  console.log(topicTitle);
})();
