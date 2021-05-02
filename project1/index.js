const Sheet = require("./utils/Sheet");
const fetch = require("node-fetch");
(async function () {
  const sheet = new Sheet();
  await sheet.load();
  await sheet.addRows([{title: "hooray", location: "nowhere"}]);
  const jobs = fetch("https://jobs.github.com/positions.json");
  console.log(jobs[0]);
})();
