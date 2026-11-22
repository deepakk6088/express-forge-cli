
require("dotenv").config();

const app = require("./app");
const prisma = require("./config/database");

const PORT = Number(process.env.PORT) || 5001;

let server;

async function startServer() {
  try {
    await prisma.$connect();

    console.log("✔ Database connected successfully");

    server = app.listen(PORT, () => {
      console.log(`✔ Server running on port ${PORT}`);
      console.log(`✔ Health: http://localhost:${PORT}/health`);
    });

    server.on("error", async (error) => {
      console.error("✖ Server failed to start:");

      if (error.code === "EADDRINUSE") {
        console.error(`Port ${PORT} is already in use.`);
      } else {
        console.error(error.message);
      }

      await prisma.$disconnect().catch(() => {});
      process.exitCode = 1;
    });

  } catch (error) {
    console.error("✖ Failed to start server:");
    console.error(error.message);

    await prisma.$disconnect().catch(() => {});
    process.exitCode = 1;
  }
}

async function shutdown() {
  console.log("\nShutting down server...");

  if (server) {
    server.close();
  }

  await prisma.$disconnect();

  console.log("✔ Database disconnected");
  process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

startServer();
