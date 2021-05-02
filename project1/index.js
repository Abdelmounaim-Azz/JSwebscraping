const Sheet = require("./utils/Sheet");
const fetch = require("node-fetch");
async function scrapePage(i, search) {
  const jobs = await fetch(
    `https://jobs.github.com/positions.json?page=${i}&search=${search}`
  );
  const res = await jobs.json();
  const rows = res.map((job) => {
    return {
      companyName: job.company,
      companyWeb: job.company_url,
      title: job.title,
      location: job.location,
      createdAt: job.created_at,
    };
  });
  return rows;
}
(async function () {
  let i = 1;
  let rows = [];
  while (true) {
    const newRows = await scrapePage(i, "code");
    console.log("rows processed:", rows.length);
    if (newRows.length === 0) {
      break;
    }
    rows = rows.concat(newRows);
    i++;
  }
  console.log("total rows length:", rows.length);
  const sheet = new Sheet();
  await sheet.load();
  await sheet.addRows(rows);
})();
