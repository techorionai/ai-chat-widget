// vite.config.js
const version = process.env.VERSION;
const base = version ? `/sdk-web/${version}/app/` : "/widget/scripts/app/";

module.exports = {
  base,
};
