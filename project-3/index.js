const fetch = require("node-fetch");

(async function () {
  const data = await fetch("https://explodingtopics.com/topics-this-month");
  const res = await data.text();
  const found = res.includes("google classroom");
  console.log(res);
})();
