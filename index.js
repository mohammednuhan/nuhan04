require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const { PrismaClient } = require("@prisma/client");
const errorHandler = require("./middleware/errorHandler");

const skillsRouter = require("./routes/skills");
const projectsRouter = require("./routes/projects");
const educationRouter = require("./routes/education");
const beyondRouter = require("./routes/beyond");
const contactRouter = require("./routes/contact");
const siteInfoRouter = require("./routes/siteInfo");

const app = express();
const prisma = new PrismaClient();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(helmet());
app.use(express.json());

app.use("/api/skills", skillsRouter);
app.use("/api/projects", projectsRouter);
app.use("/api/education", educationRouter);
app.use("/api/beyond", beyondRouter);
app.use("/api/contact", contactRouter);
app.use("/api/site-info", siteInfoRouter);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Only start the HTTP listener when run directly (e.g. npm start / local dev).
// When imported as a module (Vercel serverless), the exported `app` is used instead.
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Express app export so Vercel's @vercel/node can serve the API as a serverless
// function. `prisma` is attached for reuse if needed.
app.prisma = prisma;

module.exports = app;
