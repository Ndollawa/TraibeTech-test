import { prisma } from "~/utils";


async function main() {
  console.log("🌱 Starting database seed...");

  // --- Clear existing data (optional for dev) ---
  await prisma.article.deleteMany();
  await prisma.category.deleteMany();

  // --- Create root categories ---
  const programming = await prisma.category.create({
    data: {
      name: "Programming",
    },
  });

  const design = await prisma.category.create({
    data: {
      name: "Design",
    },
  });

  // --- Create subcategories ---
  const javascript = await prisma.category.create({
    data: {
      name: "JavaScript",
      parentId: programming.id,
    },
  });

  const remix = await prisma.category.create({
    data: {
      name: "Remix Framework",
      parentId: programming.id,
    },
  });

  const uiux = await prisma.category.create({
    data: {
      name: "UI/UX",
      parentId: design.id,
    },
  });

  // --- Create some articles ---
  await prisma.article.createMany({
    data: [
      {
        title: "Getting Started with Remix",
        slug: "getting-started-with-remix",
        content: "Remix is a full stack web framework built on React Router.",
        categoryId: remix.id,
      },
      {
        title: "Understanding Closures in JavaScript",
        slug: "understanding-closures",
        content:
          "Closures are functions that have access to outer scope variables.",
        categoryId: javascript.id,
      },
      {
        title: "Design Principles for Beginners",
        slug: "design-principles",
        content:
          "Balance, contrast, hierarchy, and alignment are key principles of design.",
        categoryId: uiux.id,
      },
    ],
  });

  console.log("✅ Database seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
