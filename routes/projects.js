const express = require("express");
const { PrismaClient } = require("@prisma/client");
const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res, next) => {
  try {
    const projects = await prisma.project.findMany({ orderBy: { order: "asc" } });
    res.json(projects);
  } catch (err) {
    next(err);
  }
});

router.get("/featured", async (req, res, next) => {
  try {
    const projects = await prisma.project.findMany({
      where: { featured: true },
      orderBy: { order: "asc" },
    });
    res.json(projects);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const project = await prisma.project.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    if (!project) return res.status(404).json({ error: "Project not found" });
    res.json(project);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { title, description, tags, githubUrl, liveUrl, imageUrl, featured, order } = req.body;
    const project = await prisma.project.create({
      data: { title, description, tags, githubUrl, liveUrl, imageUrl, featured, order },
    });
    res.status(201).json(project);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { title, description, tags, githubUrl, liveUrl, imageUrl, featured, order } = req.body;
    const project = await prisma.project.update({
      where: { id: parseInt(req.params.id) },
      data: { title, description, tags, githubUrl, liveUrl, imageUrl, featured, order },
    });
    res.json(project);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await prisma.project.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ message: "Project deleted" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
