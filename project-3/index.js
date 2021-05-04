const fetch = require("node-fetch");

(async function () {
  const data = await fetch(
    "https://www.amazon.com/TCL-4K-Smart-LED-50S435/dp/B08DHFX4FV/"
  );
  const res = await data.text();
  const found = res.includes("TCL");
  console.log(found);
})();
