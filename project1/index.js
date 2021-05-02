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
  const sheet = new Sheet();
  await sheet.load();
  let i = 1;
  let rows = [];
  while (true) {
    const newRows = await scrapePage(i, "code");
    console.log("rows processed", rows.length);
    if (newRows.length === 0) {
      break;
    }
    rows = rows.concat(newRows);
    i++;
  }
  const Sheet = new Sheet();
  await Sheet.load();
  await Sheet.addRows(rows);
})();
