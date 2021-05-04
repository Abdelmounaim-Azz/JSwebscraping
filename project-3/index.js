const fetch = require("node-fetch");
const cheerio = require("cheerio");

(async function () {
  const data = await fetch("https://explodingtopics.com/topics-this-month");
  const text = await data.text();
  const $ = cheerio.load(text);
  const containers = $(".topicInfoContainer").toArray();
  const topics = containers.map((trend) => {
    const trendDoc = $(trend);
    const title = trendDoc.find(".tileKeyword").text();
    const desc = trendDoc.find(".tileDescription").text();
    const SearchMonth = trendDoc.find("scoreTag").first().text();
    return {
      title,
      desc,
      SearchMonth,
    };
  });
  console.log(topics);
})();
