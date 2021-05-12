const {GoogleSpreadsheet} = require("google-spreadsheet");
require("dotenv").config();
const _ = require("lodash");
module.exports = class Sheet {
  constructor() {
    this.doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_URL);
  }
  async load() {
    await this.doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: _.replace(
        process.env.GOOGLE_PRIVATE_KEY,
        new RegExp("\\\\n", "g"),
        "\n"
      ),
    });

    await this.doc.loadInfo();
  }
  async addRows(rows) {
    const sheet = this.doc.sheetsByIndex[0];
    await sheet.addRows(rows);
  }
};
