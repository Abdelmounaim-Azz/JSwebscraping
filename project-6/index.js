const puppeteer = require("puppeteer");
require("dotenv").config();
const USERNAME = "azz.sahafrica";
(async function () {
  const browser = await puppeteer.launch();
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
    await page.waitForSelector("img");
    const avatar = await page.$eval("img", (el) => el.getAttribute("src"));
    const posts = await page.$eval(
      "header li:nth-child(1)",
      (el) => el.textContent
    );
    const followers = await page.$eval(
      "header li:nth-child(2)",
      (el) => el.textContent
    );
    const following = await page.$eval(
      "header li:nth-child(3)",
      (el) => el.textContent
    );
    const name = await page.$eval("header h1", (el) => el.textContent);
    const description = await page.$eval(
      "header span:nth-child(3)",
      (el) => el.textContent
    );
    console.log(avatar, posts, followers, following, name, description);
  }

  // await browser.close();
})();
