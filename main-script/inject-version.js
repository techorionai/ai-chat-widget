// inject-version.js
const fs = require("fs");
const path = require("path");

const version =
  process.env.VERSION || require("./package.json").version || "dev";
const srcPath = path.join(__dirname, "src", "consts.ts");

let content = fs.readFileSync(srcPath, "utf8");
const targetSrc = `https://chat.techorionai.com/builds/${version}/app/`;
content = content.replace(
  /export const IFRAME_SRC\s*=\s*["'][^"']*["'];?/,
  `export const IFRAME_SRC = "${targetSrc}";`,
);
fs.writeFileSync(srcPath, content);
console.log(`Injected version ${version} (${targetSrc}) into consts.ts`);
