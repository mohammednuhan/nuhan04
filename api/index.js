// Vercel serverless entry point for the Express API.
// Vercel serves this catch-all function, which forwards every request to the
// existing Express application in backend/src/index.js.
const app = require("../backend/src/index.js");

module.exports = app;
