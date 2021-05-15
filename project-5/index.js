const puppeteer = require("puppeteer");
const Sheet = require("./utils/Sheet");
const url =
  "https://old.reddit.com/r/learnprogramming/comments/4q6tae/i_highly_recommend_harvards_free_online_2016_cs50/";
(async function () {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  //create sheet with title
  const sheet = new Sheet();
  await sheet.load();
  const title = await page.$eval(".title a", (el) => el.textContent);
  const sheetIdx = await sheet.addSheet(title.slice(0, 99), [
    "points",
    "comment",
  ]);
  // expand all comment threads
  let expandsBtns = await page.$$(".morecomments");
  while (expandsBtns.length) {
    for (let button of expandsBtns) {
      await button.click();
      await page.waitForTimeout(300);
    }
    await page.waitForTimeout(1000);
    expandsBtns = await page.$$(".morecomments");
  }

  //select all cmnts and scrape text+point
  const entryCmnts = await page.$$(".entry");
  let formattedCmnts = [];
  for (let entry of entryCmnts) {
    //points
    const points = await entry
      .$eval(".score", (el) => el.textContent)
      .catch((err) => {});

    const rawComment = await entry
      .$eval(".usertext-body", (el) => el.textContent)
      .catch((err) => {});
    if (points && rawComment) {
      //filter comments
      const comment = rawComment.replace(/\n/g, "");
      formattedCmnts.push({points, comment});
    }
  }
  const filterEmtyCmnts = formattedCmnts.filter(function (el) {
    return el != "" && el != null;
  });
  //sort cmnts by points
  filterEmtyCmnts.sort((a, b) => {
    pA = Number(a.points.split(" ")[0]);
    pB = Number(b.points.split(" ")[0]);
    return pB - pA;
  });
  sheet.addRows(filterEmtyCmnts, sheetIdx);
  //insert into google-spreadsheet
  await browser.close();
})();
