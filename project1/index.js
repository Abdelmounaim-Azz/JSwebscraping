const {GoogleSpreadsheet} = require("google-spreadsheet");
require("dotenv").config();

// Initialize the sheet - doc ID is the long id in the sheets URL
const doc = new GoogleSpreadsheet("<the sheet ID from the url>");

// Initialize Auth - see more available options at https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
await doc.useServiceAccountAuth({
  client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  private_key: process.env.GOOGLE_PRIVATE_KEY,
});

await doc.loadInfo(); // loads document properties and worksheets
console.log(doc.title);
await doc.updateProperties({title: "renamed doc"});

const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]
console.log(sheet.title);
console.log(sheet.rowCount);

// adding / removing sheets
const newSheet = await doc.addSheet({title: "hot new sheet!"});
await newSheet.delete();
