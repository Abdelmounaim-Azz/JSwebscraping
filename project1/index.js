const Sheet = require("./utils/Sheet");
const fetch = require("node-fetch");
(async function () {
  const jobs = await fetch(
    "https://jobs.github.com/positions.json?location=remote"
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
  const sheet = new Sheet();
  await sheet.load();
  await sheet.addRows(rows);
})();
