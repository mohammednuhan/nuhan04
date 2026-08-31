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
      { name: "Python", icon: "python", color: "#3776AB", category: "Languages" },
      { name: "JavaScript", icon: "javascript", color: "#F7DF1E", category: "Languages" },
      { name: "TypeScript", icon: "typescript", color: "#3178C6", category: "Languages" },
      { name: "Java", icon: "java", color: "#ED8B00", category: "Languages" },
      { name: "C++", icon: "cpp", color: "#00599C", category: "Languages" },
      { name: "React", icon: "react", color: "#61DAFB", category: "Frameworks" },
      { name: "Next.js", icon: "nextjs", color: "#000000", category: "Frameworks" },
      { name: "Node.js", icon: "nodejs", color: "#339933", category: "Frameworks" },
      { name: "Express.js", icon: "express", color: "#000000", category: "Frameworks" },
      { name: "TensorFlow", icon: "tensorflow", color: "#FF6F00", category: "Frameworks" },
      { name: "Git", icon: "git", color: "#F05032", category: "Tools" },
      { name: "Docker", icon: "docker", color: "#2496ED", category: "Tools" },
      { name: "VS Code", icon: "vscode", color: "#007ACC", category: "Tools" },
      { name: "Linux", icon: "linux", color: "#FCC624", category: "Tools" },
      { name: "PostgreSQL", icon: "postgresql", color: "#4169E1", category: "Databases" },
      { name: "MongoDB", icon: "mongodb", color: "#47A248", category: "Databases" },
      { name: "Redis", icon: "redis", color: "#DC382D", category: "Databases" },
    ],
  });
  console.log(`Created ${skills.count} skills`);

  const projects = await prisma.project.createMany({
    data: [
      {
        title: "AI Agent Prototype",
        description:
          "An intelligent AI agent built with Python and TensorFlow that can perform autonomous tasks, learn from interactions, and adapt its behavior. Features natural language processing, decision-making algorithms, and a clean web interface for monitoring agent performance.",
        tags: ["Python", "TensorFlow", "NLP", "FastAPI", "React"],
        githubUrl: "https://github.com/nuhan/ai-agent",
        liveUrl: null,
        imageUrl: null,
        featured: true,
        order: 1,
      },
      {
        title: "DSA Visualizer",
        description:
          "An interactive web application that visualizes data structures and algorithms in real-time. Users can step through sorting algorithms, graph traversals, and tree operations with animated visualizations. Built to help students understand complex DSA concepts through hands-on exploration.",
        tags: ["React", "TypeScript", "D3.js", "Node.js", "Tailwind CSS"],
        githubUrl: "https://github.com/nuhan/dsa-visualizer",
        liveUrl: "https://dsa-visualizer.vercel.app",
        imageUrl: null,
        featured: true,
        order: 2,
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
        order: 1,
      },
      {
        title: "1500m Race",
        tag: "Track & Field",
        description:
          "Competed in 1500m distance events at school and college level. Built mental toughness, stamina, and the ability to perform under pressure.",
        icon: "running",
        order: 2,
      },
      {
        title: "4x400m Relay",
        tag: "Track & Field",
        description:
          "Participated in relay races, learning the value of trust, timing, and seamless handoffs. Contributed to team victories through consistent performance.",
        icon: "relay",
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
