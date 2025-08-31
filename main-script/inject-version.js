// inject-version.js
const fs = require("fs");
const path = require("path");

const version =
  process.env.VERSION || require("./package.json").version || "dev";
const srcPath = path.join(__dirname, "src", "consts.ts");
const distPath = path.join(__dirname, "src", "consts.ts");

let content = fs.readFileSync(srcPath, "utf8");
content = content.replace(
  "__IFRAME_SRC__",
  `https://www.navigable.ai/sdk-web/${version}/app/`
);
fs.writeFileSync(distPath, content);
console.log(`Injected version ${version} into consts.ts`);
