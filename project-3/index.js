const fetch = require("node-fetch");
const cheerio = require("cheerio");
const htmlparser2 = require("htmlparser2");
const Sheet = require("./utils/Sheet");

(async function () {
  let i = 1;
  let topics = [];
  while (true) {
    const newTopics = await scrapePage(i, "beauty");
    if (newTopics.length === 0) {
      break;
    }
    topics = topics.concat(newTopics);
    i++;
  }
  const sheet = new Sheet();
  await sheet.load();
  await sheet.addRows(topics);
})();

async function scrapePage(i, category) {
  const options = {
    xmlMode: true,
    decodeEntities: true, // Decode HTML entities.
    withStartIndices: false, // Add a `startIndex` property to nodes.
    withEndIndices: false, // Add an `endIndex` property to nodes.
  };
  const data = await fetch(
    `https://explodingtopics.com/${category}-topics-this-month?page=${i}`
  );
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
    let Search = trendDoc.find(".scoreTagItem").text().split(" ");
    Search = Search.length === 2 ? Search : Search[0].split("0%");
    const SearMonth = Search[0];
    const Growth = Search[1];

    return {
      title,
      desc,
      SearMonth,
      Growth,
    };
  });
  return topics;
}
