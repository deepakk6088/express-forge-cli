
require("dotenv/config");

const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL
});

const prisma = new PrismaClient({
  adapter
});

async function main() {
  console.log("Starting database seeding...");

  await prisma.user.upsert({
    where: {
      email: "admin@example.com"
    },

    update: {},

    create: {
      name: "Admin",
      email: "admin@example.com"
    }
  });

  console.log("✔ Sample user created");
}

main()
  .catch((error) => {
    console.error("Seeding failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
