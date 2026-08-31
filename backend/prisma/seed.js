const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  await prisma.skill.deleteMany();
  await prisma.project.deleteMany();
  await prisma.education.deleteMany();
  await prisma.beyondCard.deleteMany();
  await prisma.sportAchievement.deleteMany();
  await prisma.contactMessage.deleteMany();

  const skills = await prisma.skill.createMany({
    data: [
      { name: "Java", icon: "java", color: "#ED8B00", category: "Languages", description: "Object-oriented backend programming." },
      { name: "C++", icon: "cpp", color: "#00599C", category: "Languages", description: "Systems & performance programming." },
      { name: "Python", icon: "python", color: "#3776AB", category: "Languages", description: "Core language for AI, ML & scripting." },
      { name: "JavaScript", icon: "javascript", color: "#F7DF1E", category: "Languages", description: "Dynamic web & app scripting." },
      { name: "TypeScript", icon: "typescript", color: "#3178C6", category: "Languages", description: "Type-safe JavaScript for scalability." },
      { name: "HTML", icon: "html", color: "#E34F26", category: "Web Development", description: "Semantic page structure." },
      { name: "CSS", icon: "css", color: "#1572B6", category: "Web Development", description: "Responsive styling & animations." },
      { name: "React", icon: "react", color: "#61DAFB", category: "Web Development", description: "Component-based UI development." },
      { name: "Next.js", icon: "nextjs", color: "#000000", category: "Web Development", description: "React framework for full-stack apps." },
      { name: "Node.js", icon: "nodejs", color: "#339933", category: "Web Development", description: "Server-side JavaScript runtime." },
      { name: "Express.js", icon: "express", color: "#000000", category: "Web Development", description: "Lightweight Node.js web framework." },
      { name: "TensorFlow", icon: "tensorflow", color: "#FF6F00", category: "AI / ML", description: "Building & training ML models." },
      { name: "PyTorch", icon: "pytorch", color: "#EE4C2C", category: "AI / ML", description: "Deep learning & neural networks." },
      { name: "Scikit-learn", icon: "scikit", color: "#F7931E", category: "AI / ML", description: "Classic machine learning algorithms." },
      { name: "NLP", icon: "nlp", color: "#00d4aa", category: "AI / ML", description: "Natural language processing systems." },
      { name: "Docker", icon: "docker", color: "#2496ED", category: "DevOps", description: "Containerized application deployments." },
      { name: "Git", icon: "git", color: "#F05032", category: "DevOps", description: "Version control & collaboration." },
      { name: "Linux", icon: "linux", color: "#FCC624", category: "DevOps", description: "Server & CLI environment work." },
      { name: "Vercel", icon: "vercel", color: "#ffffff", category: "DevOps", description: "Frontend & serverless deployment." },
      { name: "PostgreSQL", icon: "postgresql", color: "#4169E1", category: "Databases", description: "Relational database & SQL." },
      { name: "MongoDB", icon: "mongodb", color: "#47A248", category: "Databases", description: "NoSQL document database." },
      { name: "Redis", icon: "redis", color: "#DC382D", category: "Databases", description: "In-memory caching & queues." },
      { name: "REST API", icon: "code", color: "#00d4aa", category: "Web Development", description: "Designing & consuming RESTful APIs." },
      { name: "Angular", icon: "angular", color: "#DD0031", category: "Web Development", description: "TypeScript-based frontend framework." },
      { name: "API Testing", icon: "code", color: "#8B5CF6", category: "DevOps", description: "Testing & validating RESTful APIs." },
      { name: "GitHub", icon: "git", color: "#181717", category: "DevOps", description: "Version control hosting & collaboration." },
      { name: "Prisma", icon: "database", color: "#2D3748", category: "Databases", description: "Modern TypeScript ORM for Node.js." },
    ],
  });
  console.log(`Created ${skills.count} skills`);

  const projects = await prisma.project.createMany({
    data: [
      {
        title: "CEX — Centralized Cryptocurrency Exchange",
        description:
          "A backend system that simulates the core mechanics of a centralized cryptocurrency exchange — JWT authentication, wallet deposit/withdrawal, buy & sell orders with a price-prioritized order book, and foundational order-matching logic. Built to understand real exchange architecture using PostgreSQL for persistent storage.",
        tags: ["Node.js", "Express", "Prisma", "PostgreSQL", "JWT"],
        githubUrl: "https://github.com/mohammednuhan/stock-app",
        liveUrl: null,
        imageUrl: "/images/cex-architecture.svg",
        featured: true,
        order: 1,
      },
      {
        title: "PAYTM Clone — Digital Wallet & Payments",
        description:
          "A full-stack digital wallet and payment application inspired by Paytm. Features secure JWT authentication, wallet deposit/withdraw and balance management, money transfers between users, and a transaction history built on a credit/debit ledger system using Prisma & PostgreSQL.",
        tags: ["React", "Node.js", "Express", "Prisma", "PostgreSQL", "JWT"],
        githubUrl: "https://github.com/mohammednuhan/paytm-clone-app",
        liveUrl: null,
        imageUrl: "/images/paytm-architecture.svg",
        featured: true,
        order: 2,
      },
      {
        title: "RETAIN — Terminal-Based AI Agent",
        description:
          "A lightweight terminal-based AI agent built in Python (fully hand-coded, no AI used). It provides an interactive CLI to chat with an AI model and perform real tasks via 7 tools: run shell commands, read/write/edit files, list & create directories, and search across files — all with a Rich-powered terminal interface. Open source and publicly deployed for anyone to try.",
        tags: ["Python", "OpenAI SDK", "Rich", "OpenRouter", "CLI", "Open Source"],
        githubUrl: "https://github.com/mohammednuhan/Retain",
        liveUrl: null,
        imageUrl: "/images/retain-architecture.svg",
        featured: true,
        order: 3,
      },
      {
        title: "To-Do API — Authentication & CRUD",
        description:
          "A beginner-friendly backend API project for learning the foundations of Node.js and authentication. Implements user signup/signin with JWT tokens and a protected to-do list (add & list todos) built with Express and PostgreSQL (Neon). A hands-on introduction to building secure REST APIs end-to-end.",
        tags: ["Node.js", "Express", "PostgreSQL", "JWT", "REST API"],
        githubUrl: "https://github.com/mohammednuhan/todo-app",
        liveUrl: null,
        imageUrl: "/images/todo-architecture.svg",
        featured: true,
        order: 4,
      },
      {
        title: "Luxury Wedding Invitation — PWA",
        description:
          "A premium, interactive digital wedding invitation built as a Progressive Web App (PWA) using AI-assisted coding. Opens with a magical loading sequence (Bismillah → couple names → 'Open Invitation'), then reveals a scratch-to-reveal coin, animated story timeline, event cards (Nikah, Reception, Haldi, Mehendi, Walima), live countdown, floating WhatsApp/share buttons, and a secure admin panel. Built with React, Express & PostgreSQL and deployed live — guests use the link on their phones.",
        tags: ["React", "Express", "PostgreSQL", "GSAP", "Tailwind", "PWA", "Vercel"],
        githubUrl: "https://github.com/mohammednuhan/invitation-card",
        liveUrl: "https://weddingcelebrationcard.vercel.app/",
        imageUrl: "/images/invitation-architecture.svg",
        featured: true,
        order: 5,
      },
    ],
  });
  console.log(`Created ${projects.count} projects`);

  const education = await prisma.education.createMany({
    data: [
      {
        degree: "B.Tech",
        institution: "Presidency University",
        field: "Computer Science - AI & Machine Learning",
        status: "Pursuing",
        focus: "Artificial Intelligence, Machine Learning, Deep Learning, NLP",
        coursework: [
          "Data Structures & Algorithms",
          "Machine Learning",
          "Deep Learning",
          "Natural Language Processing",
          "Database Management Systems",
          "Operating Systems",
          "Computer Networks",
          "Web Development",
        ],
        keyLearnings: [
          "Built AI models using TensorFlow and PyTorch",
          "Developed full-stack web applications",
          "Strong foundation in algorithms and problem solving",
          "Hands-on experience with real-world ML projects",
        ],
        icon: "graduation-cap",
        order: 1,
      },
      {
        degree: "PUC",
        institution: "Science Stream",
        field: "Physics, Chemistry, Mathematics, Computer Science",
        status: "Completed",
        focus: "Strong fundamentals in Mathematics and Computer Science",
        coursework: ["Physics", "Chemistry", "Mathematics", "Computer Science"],
        keyLearnings: [
          "Built strong analytical and mathematical foundations",
          "Developed early interest in programming",
          "Achieved excellent academic performance",
        ],
        icon: "book",
        order: 2,
      },
    ],
  });
  console.log(`Created ${education.count} education entries`);

  const traits = await prisma.beyondCard.createMany({
    data: [
      {
        title: "Leadership",
        description:
          "Led team projects and organized technical events. Experienced in guiding teams toward successful project delivery with clear communication and delegation.",
        icon: "users",
        type: "trait",
        order: 1,
      },
      {
        title: "Discipline",
        description:
          "Maintain consistent daily routines, structured learning schedules, and disciplined approach to problem-solving and self-improvement.",
        icon: "clock",
        type: "trait",
        order: 2,
      },
      {
        title: "Teamwork",
        description:
          "Collaborate effectively with diverse teams. Strong communication skills and ability to work harmoniously in group settings to achieve common goals.",
        icon: "handshake",
        type: "trait",
        order: 3,
      },
      {
        title: "Competitive Mindset",
        description:
          "Thrive in competitive environments. Regular participate in coding contests and hackathons, constantly pushing limits to improve skills.",
        icon: "trophy",
        type: "trait",
        order: 4,
      },
    ],
  });
  console.log(`Created ${traits.count} beyond cards`);

  const sports = await prisma.sportAchievement.createMany({
    data: [
      {
        title: "Football",
        tag: "Team Sport",
        description:
          "Active football player with experience in inter-college tournaments. Developed teamwork, strategic thinking, and physical endurance through the sport.",
        icon: "football",
        level: 85,
        levelLabel: "Club-Level Player",
        order: 1,
      },
      {
        title: "1500m Race",
        tag: "Track & Field",
        description:
          "Competed in 1500m distance events at school and college level. Built mental toughness, stamina, and the ability to perform under pressure.",
        icon: "running",
        level: 78,
        levelLabel: "District Competitor",
        order: 2,
      },
      {
        title: "4x400m Relay",
        tag: "Track & Field",
        description:
          "Participated in relay races, learning the value of trust, timing, and seamless handoffs. Contributed to team victories through consistent performance.",
        icon: "relay",
        level: 82,
        levelLabel: "Relay Specialist",
        order: 3,
      },
    ],
  });
  console.log(`Created ${sports.count} sport achievements`);

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
