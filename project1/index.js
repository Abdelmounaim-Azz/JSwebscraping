const {GoogleSpreadsheet} = require("google-spreadsheet");
require("dotenv").config();

// Initialize the sheet - doc ID is the long id in the sheets URL
const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_URL);

// Initialize Auth - see more available options at https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
await doc.useServiceAccountAuth({
  client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  private_key: process.env.GOOGLE_PRIVATE_KEY,
});

await doc.loadInfo(); // loads document properties and worksheets
console.log(doc.title);
await doc.updateProperties({title: "renamed doc"});
