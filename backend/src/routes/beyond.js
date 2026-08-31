const express = require("express");
const { PrismaClient } = require("@prisma/client");
const router = express.Router();
const prisma = new PrismaClient();

router.get("/traits", async (req, res, next) => {
  try {
    const traits = await prisma.beyondCard.findMany({
      where: { type: "trait" },
      orderBy: { order: "asc" },
    });
    res.json(traits);
  } catch (err) {
    next(err);
  }
});

router.get("/sports", async (req, res, next) => {
  try {
    const sports = await prisma.sportAchievement.findMany({ orderBy: { order: "asc" } });
    res.json(sports);
  } catch (err) {
    next(err);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const traits = await prisma.beyondCard.findMany({ orderBy: { order: "asc" } });
    const sports = await prisma.sportAchievement.findMany({ orderBy: { order: "asc" } });
    res.json({ traits, sports });
  } catch (err) {
    next(err);
  }
});

router.post("/traits", async (req, res, next) => {
  try {
    const { title, description, icon, type, order } = req.body;
    const card = await prisma.beyondCard.create({
      data: { title, description, icon, type: type || "trait", order },
    });
    res.status(201).json(card);
  } catch (err) {
    next(err);
  }
});

router.post("/sports", async (req, res, next) => {
  try {
    const { title, tag, description, icon, order } = req.body;
    const sport = await prisma.sportAchievement.create({
      data: { title, tag, description, icon, order },
    });
    res.status(201).json(sport);
  } catch (err) {
    next(err);
  }
});

router.put("/traits/:id", async (req, res, next) => {
  try {
    const { title, description, icon, type, order } = req.body;
    const card = await prisma.beyondCard.update({
      where: { id: parseInt(req.params.id) },
      data: { title, description, icon, type, order },
    });
    res.json(card);
  } catch (err) {
    next(err);
  }
});

router.put("/sports/:id", async (req, res, next) => {
  try {
    const { title, tag, description, icon, order } = req.body;
    const sport = await prisma.sportAchievement.update({
      where: { id: parseInt(req.params.id) },
      data: { title, tag, description, icon, order },
    });
    res.json(sport);
  } catch (err) {
    next(err);
  }
});

router.delete("/traits/:id", async (req, res, next) => {
  try {
    await prisma.beyondCard.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ message: "Trait deleted" });
  } catch (err) {
    next(err);
  }
});

router.delete("/sports/:id", async (req, res, next) => {
  try {
    await prisma.sportAchievement.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ message: "Sport achievement deleted" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
