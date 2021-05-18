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
  const PROFILES = [
    "rosenamajunas",
    "jordan.b.peterson",
    "amazonwebservices",
    "hamza_aithou",
  ];
  //wait for page loading
  await page.waitForNavigation();
  for (let PROFILE of PROFILES) {
    await page.goto(`https://instagram.com/${PROFILE}`);
    await page.waitForSelector("img");
    const avatar = await page
      .$eval("img", (el) => el.getAttribute("src"))
      .catch((err) => {});
    const posts = await page
      .$eval("header li:nth-child(1)", (el) => el.textContent)
      .catch((err) => {});
    const followers = await page
      .$eval("header li:nth-child(2)", (el) => el.textContent)
      .catch((err) => {});
    const following = await page
      .$eval("header li:nth-child(3)", (el) => el.textContent)
      .catch((err) => {});
    const name = await page
      .$eval("header h1", (el) => el.textContent)
      .catch((err) => {});
    const description = await page
      .$eval(".-vDIg span", (el) => el.textContent)
      .catch((err) => {});

    let personalLink = await page
      .$eval(".-vDIg > a:last-child", (el) => el.textContent)
      .catch((err) => {});
    const profile = {
      username: PROFILE,
      name,
      avatar,
      posts,
      following,
      followers,
      description,
      personalLink,
    };
    console.log({profile});
  }

  // await browser.close();
})();
