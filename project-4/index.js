const fetch = require("node-fetch");
const cheerio = require("cheerio");
const Sheet = require("./utils/Sheet");
(async function () {
  const sheet = new Sheet();
  await sheet.load();
  const stocks = await sheet.getRows(0);
  let tickerPrices = {};
  for (let stock of stocks) {
    const price = await scrapStockPrice(stock.url);
    tickerPrices[stock.ticker] = price;
  }
  tickerPrices.date = new Date().toDateString();
  await sheet.addRows([tickerPrices], 1);
})();

async function scrapStockPrice(url) {
  const res = await fetch(url);
  const text = await res.text();
  const $ = cheerio.load(text);
  const price = $("[data-test=instrument-price-last]").first().text();
  return price;
}
