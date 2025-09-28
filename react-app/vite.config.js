// vite.config.js
const version = process.env.VERSION;
const base = version ? `/sdk-web/${version}/app/` : "/sdk-web/0.9.11/app/";

module.exports = {
  base,
};
