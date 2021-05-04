const {GoogleSpreadsheet} = require("google-spreadsheet");
const _ = require("lodash");
require("dotenv").config();
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
  async getRows() {
    const sheet = this.doc.sheetsByIndex[0];
    return await sheet.getRows();
  }
};
