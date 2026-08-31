// Vercel serverless entry point for the Express API.
// Vercel serves this catch-all function, forwarding every request to the
// Express application defined in ../index.js.
const app = require("../index.js");

module.exports = app;
