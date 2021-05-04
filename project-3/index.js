const fetch = require("node-fetch");

(async function () {
  const data = await fetch("https://news.ycombinator.com/");
  console.log(data);
})();
