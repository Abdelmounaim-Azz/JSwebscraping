const puppeteer = require("puppeteer");
require("dotenv").config();
const USERNAME = "azz.sahafrica";
(async function () {
  const browser = await puppeteer.launch({headless: false});
  const PROFILES = ["rosenamajunas"];
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
  for (let profile of PROFILES) {
    await page.goto(`https://instagram.com/${profile}`);
    await page.waitForNavigation();
    const avatar = await page.$eval("img", (el) => el.getAttribute("src"));
    console.log({avatar});
  }

  // await browser.close();
})();
