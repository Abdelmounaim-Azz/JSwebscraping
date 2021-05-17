const puppeteer = require("puppeteer");

(async function () {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto("https://instagram.com");
  const inputs = await page.$$(".input");
  await inputs[0].type(process.env.USERNAME);
  await inputs[1].type(process.env.PASSWORD);
  // await browser.close();
})();
