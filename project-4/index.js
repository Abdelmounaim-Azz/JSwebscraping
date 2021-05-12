const fetch = require("node-fetch");
const cheerio = require("cheerio");

(async function () {
  const res = await fetch("https://www.investing.com/equities/facebook-inc");
  const text = await res.text();
  const $ = cheerio.load(text);
  const price = $("[data-test=instrument-price-last]").first().text();
  console.log(price);
})();
