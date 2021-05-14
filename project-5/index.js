const puppeteer = require("puppeteer");
const url =
  "https://old.reddit.com/r/learnprogramming/comments/4q6tae/i_highly_recommend_harvards_free_online_2016_cs50/";
(async function () {
  //boiler plate
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto(url);
  //expand all comment threads
  const expandsBtns = await page.$$(".morecomments");
  for (let button of expandsBtns) {
    await button.click();
    await page.waitForTimeout(300);
  }
  //select all cmnts and scrape text+point
  //sort cmnts by points
  //insert into google-spreadsheet
  // await browser.close();
})();
