const puppeteer = require("puppeteer");
const Sheet = require("./utils/Sheet");
require("dotenv").config();
const USERNAME = "jhsyteel";
(async function () {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  process.on("unhandledRejection", (reason, p) => {
    console.error("Unhandled Rejection at: Promise", p, "reason:", reason);
    browser.close();
  });
  await page.goto("https://instagram.com");
  await page.waitForSelector("input");
  const inputs = await page.$$("input");
  await inputs[0].type(USERNAME);
  await inputs[1].type(process.env.PASSWORD);
  const loginBtn = (await page.$$("button"))[1]; //select the returned value of the promise.
  await loginBtn.click();
  //wait for page loading
  await page.waitForNavigation();
  let profiles = [];
  const sheet = new Sheet();
  await sheet.load();
  const USERNAMES = (await sheet.getRows(0)).map((row) => row.profile);
  for (let PROFILE of USERNAMES) {
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
    profiles.push(profile);
  }
  let oldProfiles = await sheet.getRows(1);
  for (let oldProfile of oldProfiles) {
    if (PROFILES.includes(oldProfile.username)) {
      await oldProfile.delete();
      console.log(`${oldProfile.username} row got deleted`);
    }
  }
  await sheet.addRows(profiles, 1);
  await browser.close();
})();
