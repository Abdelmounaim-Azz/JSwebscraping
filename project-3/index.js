const fetch = require("node-fetch");

(async function () {
  const data = await fetch("https://news.ycombinator.com/");
  const res = data.json();
  console.log(res);
})();
