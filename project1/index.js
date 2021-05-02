const Sheet = require("./utils/Sheet");
const fetch = require("node-fetch");
(async function () {
  const sheet = new Sheet();
  await sheet.load();
  await sheet.addRows([{title: "added", location: "now"}]);
  const jobs = await fetch("https://jobs.github.com/positions.json");
  const res = await jobs.json();
  console.log(res);
})();
