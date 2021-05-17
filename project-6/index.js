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
  // const loginBtn = (await page.$$("button"))[1]; //select the returned value of the promise.
  const loginBtn = await page.$x(
    "/html/body/div[2]/section/main/article/div[2]/div[1]/div/form/div/div[3]"
  );
  loginBtn[0].click();

  // await browser.close();
})();
