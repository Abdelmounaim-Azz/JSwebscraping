const Sheet = require("./utils/Sheet");
(async function () {
  const sheet = new Sheet();
  await sheet.load();
  await sheet.addRows([{title: "hooray", location: "nowhere"}]);
})();
