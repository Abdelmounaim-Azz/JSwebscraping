const fetch = require("node-fetch");

(async function () {
  const data = await fetch("https://news.ycombinator.com/");
  const res = data.json().slice(0, 10);
  console.log(res);
})();
