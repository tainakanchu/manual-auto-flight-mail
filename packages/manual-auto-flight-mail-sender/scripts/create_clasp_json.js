require("dotenv").config();

const fs = require("fs");
const scriptId = process.env.SCRIPT_ID;

const claspJson = {
  scriptId: scriptId,
  rootDir: "./src",
};

fs.writeFileSync(".clasp.json", JSON.stringify(claspJson, null, 2));
