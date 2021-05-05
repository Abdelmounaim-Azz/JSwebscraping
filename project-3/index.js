const fetch = require("node-fetch");
const cheerio = require("cheerio");
const htmlparser2 = require("htmlparser2");

(async function () {
  const options = {
    xmlMode: true,
    decodeEntities: true, // Decode HTML entities.
    withStartIndices: false, // Add a `startIndex` property to nodes.
    withEndIndices: false, // Add an `endIndex` property to nodes.
  };
  const data = await fetch("https://explodingtopics.com/topics-this-month");
  const text = await data.text();
  const dom = htmlparser2.parseDOM(text, options);
  const $ = cheerio.load(dom, {
    xml: {
      normalizeWhitespace: true,
    },
  });
  const containers = $(".topicInfoContainer").toArray();
  const topics = containers.map((trend) => {
    const trendDoc = $(trend);
    const title = trendDoc.find(".tileKeyword").text();
    const desc = trendDoc.find(".tileDescription").text();
    const SearchMonth = trendDoc.find(".scoreTagItem").text();
    const SearchGrowth = SearchMonth.split(" ");
    return {
      title,
      desc,
      SearchGrowth,
    };
  });
  console.log(topics);
})();
