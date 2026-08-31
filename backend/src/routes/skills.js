const express = require("express");
const { PrismaClient } = require("@prisma/client");
const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res, next) => {
  try {
    const skills = await prisma.skill.findMany({ orderBy: { createdAt: "desc" } });
    res.json(skills);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const skill = await prisma.skill.findUnique({ where: { id: parseInt(req.params.id) } });
    if (!skill) return res.status(404).json({ error: "Skill not found" });
    res.json(skill);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, description, icon, color, category } = req.body;
    const skill = await prisma.skill.create({
      data: { name, description, icon, color, category },
    });
    res.status(201).json(skill);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { name, description, icon, color, category } = req.body;
    const skill = await prisma.skill.update({
      where: { id: parseInt(req.params.id) },
      data: { name, description, icon, color, category },
    });
    res.json(skill);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await prisma.skill.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ message: "Skill deleted" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
