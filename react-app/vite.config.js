// vite.config.js
const version = process.env.VERSION;
const base = version ? `/builds/${version}/app/` : "/";

module.exports = {
  base,
};
