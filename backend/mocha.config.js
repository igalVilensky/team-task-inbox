// backend/mocha.config.js
module.exports = {
  require: ["./tests/setup.js"], // load setup before tests
  extension: ["js"],
  spec: "tests/**/*.test.js",
  ui: "bdd",
  timeout: 10000, // optional: increase timeout for MongoMemoryServer
};
