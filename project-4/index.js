const fetch = require("node-fetch");
const cheerio = require("cheerio");

(async function () {
  const res = await fetch("https://www.investing.com/equities/facebook-inc");
  const text = await res.text();
  const found = text.includes("302.55");
  console.log({found});
})();
