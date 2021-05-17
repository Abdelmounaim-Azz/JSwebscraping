const puppeteer = require("puppeteer");
require("dotenv").config();
const USERNAME = "azz.sahafrica";
(async function () {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto("https://instagram.com");
  await page.waitForSelector("input");
  const inputs = await page.$$("input");
  await inputs[0].type(USERNAME);
  await inputs[1].type(process.env.PASSWORD);
  const loginBtn = (await page.$$("button"))[1]; //select the returned value of the promise.
  await loginBtn.click();
  //wait for page loading
  await page.waitForNavigation();
  await page.goto(`https://instagram.com/${process.env.PROFILE}`);
  await page.waitForSelector("article a");
  await (await page.$("article a")).click();
  await page.waitForNavigation();
  await (await page.$$("button")[2]).click();
  // await browser.close();
})();
