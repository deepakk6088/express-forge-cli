#!/usr/bin/env node
const { Command } = require("commander");
const prompts = require("prompts");
const chalk = require("chalk");
const ora = require("ora");

const createProject = require("../src/generators/express");

const program = new Command();

program
  .name("express-forge")
  .description("Generate an Express backend with Prisma and PostgreSQL")
  .version("1.0.0");

program
  .argument("<project-name>", "Name of your backend project")
  .action(async (projectName) => {
    // Validate project name
    if (!/^[a-zA-Z0-9_-]+$/.test(projectName)) {
      console.log(
        chalk.red("\nInvalid project name. Use only letters, numbers, - and _.")
      );
      process.exitCode = 1;
      return;
    }

    console.log(chalk.cyan("\n⚡ Welcome to Express Forge!\n"));

    const answers = await prompts(
      [
        {
          type: "text",
          name: "port",
          message: "Enter server port:",
          initial: "5001",
          validate: (value) =>
            Number.isInteger(Number(value)) &&
            Number(value) >= 1 &&
            Number(value) <= 65535
              ? true
              : "Enter a valid port between 1 and 65535"
        },
        {
          type: "text",
          name: "databaseUrl",
          message: "Enter PostgreSQL database URL:",
          initial: "postgresql://postgres:password@localhost:5432/mydb",
          validate: (value) => {
            try {
              const url = new URL(value);

              return (
                ["postgresql:", "postgres:"].includes(url.protocol) &&
                url.hostname &&
                url.username &&
                url.password &&
                url.port &&
                url.pathname.length > 1
              )
                ? true
                : "Enter a valid PostgreSQL connection URL";
            } catch {
              return "Enter a valid PostgreSQL connection URL";
            }
          }
        },
        {
          type: "text",
          name: "frontendUrl",
          message: "Enter frontend URL:",
          initial: "http://localhost:5173",
          validate: (value) => {
            try {
              const url = new URL(value);
              return ["http:", "https:"].includes(url.protocol)
                ? true
                : "Enter a valid HTTP or HTTPS URL";
            } catch {
              return "Enter a valid frontend URL";
            }
          }
        }
      ],
      {
        onCancel: () => {
          console.log(chalk.red("\nSetup cancelled."));
          process.exitCode = 1;
          return false;
        }
      }
    );

    if (
      !answers ||
      !answers.port ||
      !answers.databaseUrl ||
      !answers.frontendUrl
    ) {
      return;
    }

    const spinner = ora("Creating your backend...").start();

    try {
      await createProject(projectName, answers);

      spinner.succeed("Backend generated successfully!");

      console.log(chalk.green("\nNext steps:\n"));
      console.log(`cd ${projectName}`);
      console.log("npm install");
      console.log("npx prisma generate");
      console.log("npx prisma migrate dev --name init");
      console.log("npm run db:seed");
      console.log("npm run dev");
    } catch (error) {
      spinner.fail("Project generation failed.");
      console.error(chalk.red(error.message));
      process.exitCode = 1;
    }
  });

program.parse(process.argv);
