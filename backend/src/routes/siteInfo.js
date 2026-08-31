const express = require("express");
const router = express.Router();

const siteInfo = {
  hero: {
    greeting: "Hello, I'm",
    name: "Nuhan",
    tagline: "Aspiring AI/ML Engineer & Full-Stack Developer",
    description:
      "Passionate about building intelligent systems and elegant web applications. Currently pursuing B.Tech in AI & Machine Learning.",
  },
  about: {
    bio: "I'm a passionate Computer Science student specializing in AI & Machine Learning at East West Institute of Technology, Bangalore. I love building full-stack web applications and exploring the frontiers of artificial intelligence. With a strong foundation in DSA and hands-on experience with modern frameworks, I aim to create impactful solutions that bridge the gap between cutting-edge research and real-world applications.",
    highlights: [
      "AI & Machine Learning Enthusiast",
      "Full-Stack Web Developer",
      "DSA Problem Solver",
      "Team Leader & Collaborator",
    ],
  },
  socials: {
    github: "https://github.com/mohammednuhan",
    linkedin: "https://www.linkedin.com/in/mohammednuhan04/",
    email: "nuhanmohammed04@gmail.com",
  },
  contact: {
    email: "nuhanmohammed04@gmail.com",
    location: "Bangalore, Karnataka, India",
    availability: "Open to internships and collaborative projects",
  },
};

router.get("/", (req, res) => {
  res.json(siteInfo);
});

module.exports = router;
