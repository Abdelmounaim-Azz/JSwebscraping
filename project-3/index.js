const fetch = require("node-fetch");

(async function () {
  const data = await fetch("https://news.ycombinator.com/");
  const res = await data.text();
  const found = res.includes("Excalidraw");
  console.log(found);
})();
