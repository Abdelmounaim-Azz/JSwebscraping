const puppeteer = require("puppeteer");
require("dotenv").config();
(async function () {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto("https://instagram.com");
  await page.waitForSelector("input");
  const inputs = await page.$$("input");
  await inputs[0].type(process.env.USERNAME);
  await inputs[1].type(process.env.PASSWORD);
  // await browser.close();
})();
