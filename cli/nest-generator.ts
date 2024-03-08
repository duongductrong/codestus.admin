import { exec } from "child_process";
import { join } from "path";
import { prompt } from "prompts";

const destination = {
  typormTargetModule: "apps/server/src/modules",
  typormTargetMigration: "apps/server/src/database/migrations",
  nestTargetRootApp: "apps/server",
};

async function generatorNestPrompt() {
  const args = await prompt([
    {
      type: "multiselect",
      name: "schematics",
      message: "What's kind you want to generate?",
      choices: [
        {
          title: "Module",
          value: "mo",
        },
        {
          title: "Service",
          value: "s",
        },
        {
          title: "Controller",
          value: "co",
        },
        {
          title: "Interface",
          value: "itf",
        },
        {
          title: "Entity",
          value: "typeorm entity:create",
        },
        {
          title: "Migration",
          value: "typeorm migration:create",
        },
        {
          title: "Autogenerate Migration",
          value: "typeorm-ts-node-esm migration:generate",
        },
        {
          title: "Guard",
          value: "gu",
        },
        {
          title: "Resource",
          value: "res",
        },
        {
          title: "Resolver",
          value: "r",
        },
        {
          title: "Provider",
          value: "pr",
        },
        {
          title: "Pipe",
          value: "pi",
        },
        {
          title: "Middleware",
          value: "mi",
        },
        {
          title: "Interceptor",
          value: "itc",
        },
        {
          title: "Gateway",
          value: "ga",
        },
        {
          title: "Filter",
          value: "f",
        },
        {
          title: "Decorator",
          value: "d",
        },
        {
          title: "Class",
          value: "cl",
        },
        {
          title: "Library",
          value: "l",
        },
        {
          title: "Config",
          value: "config",
        },
      ],
    },

    {
      type: "text",
      name: "name",
      message: "Name",
    },
  ]);

  const { name, schematics } = args;

  (schematics ?? []).map((schematic: string) => {
    if (schematic.includes("typeorm")) {
      let finalValue = "";

      if (schematic.includes("entity:create")) {
        finalValue = join(
          destination.typormTargetModule,
          name,
          "entities",
          `${name}.entity`
        );
      } else if (schematic.includes("migration:create")) {
        finalValue = join(destination.typormTargetMigration, name);
      } else if (schematic.includes("migration:generate")) {
        finalValue = `./${destination.typormTargetMigration}/$npm_config_name -d ./${destination.nestTargetRootApp}/src/datasource.ts`;
      }

      exec(`npx ${schematic} ${finalValue}`);

      return;
    }

    const generationFile = join("modules", name);

    exec(
      `cd ${destination.nestTargetRootApp} && npx nest g ${schematic} ${generationFile}`
    );
  });
}

async function main() {
  // const result = await prompt([
  //   {
  //     type: 'select',
  //     name: 'g',
  //     message: 'What kind do you want to choose?',
  //     choices: [
  //       { title: 'Entity', value: generateType.entity },
  //       { title: 'Nest', value: generateType.module },
  //     ],
  //   },
  // ]);

  // switch (result.g) {
  //   case generateType.entity:
  //     generatorEntityPrompt();
  //     break;
  //   case generateType.module:

  //     break;
  // }
  generatorNestPrompt();
}

main();
