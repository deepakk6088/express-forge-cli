
const fs = require("fs");
const path = require("path");

async function createProject(projectName, answers) {
  // Validate project name
  if (!/^[a-zA-Z0-9_-]+$/.test(projectName)) {
    throw new Error("Invalid project name.");
  }

  // Validate required answers
  if (
    !answers ||
    !answers.port ||
    !answers.databaseUrl ||
    !answers.frontendUrl
  ) {
    throw new Error("Missing project configuration.");
  }

  const projectPath = path.resolve(process.cwd(), projectName);

  // Prevent overwriting an existing file or folder
  if (fs.existsSync(projectPath)) {
    throw new Error(`A file or folder named "${projectName}" already exists.`);
  }

  const templatePath = path.join(__dirname, "../../templates/express");

  if (!fs.existsSync(templatePath)) {
    throw new Error("Express template directory not found.");
  }

  try {
    fs.cpSync(templatePath, projectPath, {
      recursive: true
    });

    console.log("\nConfiguring project...");

    const envContent = [
      `PORT=${answers.port}`,
      `DATABASE_URL=${JSON.stringify(answers.databaseUrl)}`,
      `FRONTEND_URL=${JSON.stringify(answers.frontendUrl)}`,
      ""
    ].join("\n");

    fs.writeFileSync(
      path.join(projectPath, ".env"),
      envContent,
      "utf8"
    );

    console.log("✔ Project folders created");
    console.log("✔ Environment variables configured");
  } catch (error) {
    fs.rmSync(projectPath, {
      recursive: true,
      force: true
    });

    throw new Error(`Project generation failed: ${error.message}`);
  }
}

module.exports = createProject;
