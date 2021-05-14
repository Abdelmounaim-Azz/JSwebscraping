const puppeteer = require("puppeteer");
const url =
  "https://old.reddit.com/r/learnprogramming/comments/4q6tae/i_highly_recommend_harvards_free_online_2016_cs50/";
(async function () {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto(url);
  // expand all comment threads
  let expandsBtns = await page.$$(".morecomments");
  while (expandsBtns.length) {
    for (let button of expandsBtns) {
      await button.click();
      await page.waitForTimeout(300);
    }
    await page.waitForTimeout(500);
    expandsBtns = await page.$$(".morecomments");
  }

  //select all cmnts and scrape text+point
  const entryCmnts = await page.$$(".entry");
  for (let entry of entryCmnts) {
    //points
    const points = await entry
      .$eval(".score", (el) => el.textContent)
      .catch((err) => {});
    const formattedCmnts = [];
    const rawComment = await entry
      .$eval(".usertext-body", (el) => el.textContent)
      .catch((err) => {});
    if (points && rawComment) {
      //filter comments
      const comment = rawComment.replace(/\n/g, "");
      formattedCmnts.push({points, comment});
    }
  }
  //sort cmnts by points
  //insert into google-spreadsheet
  // await browser.close();
})();
