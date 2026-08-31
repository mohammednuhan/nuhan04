const express = require("express");
const { PrismaClient } = require("@prisma/client");
const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res, next) => {
  try {
    const education = await prisma.education.findMany({ orderBy: { order: "asc" } });
    res.json(education);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { degree, institution, field, status, focus, coursework, keyLearnings, icon, order } =
      req.body;
    const education = await prisma.education.create({
      data: { degree, institution, field, status, focus, coursework, keyLearnings, icon, order },
    });
    res.status(201).json(education);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { degree, institution, field, status, focus, coursework, keyLearnings, icon, order } =
      req.body;
    const education = await prisma.education.update({
      where: { id: parseInt(req.params.id) },
      data: { degree, institution, field, status, focus, coursework, keyLearnings, icon, order },
    });
    res.json(education);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await prisma.education.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ message: "Education deleted" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
