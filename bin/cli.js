#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { program } from "commander";
import recast from "recast";
import babelParser from "@babel/parser";
import generateJSDoc from "../src/generateJSDoc.js";

console.log("🚀 AutoJSDoc CLI is running...");
program
  .version("1.0.0")
  .argument(
    "<file>",
    "JavaScript or TypeScript file to generate JSDoc comments for"
  )
  .option("-o, --overwrite", "Overwrite existing comments")
  .option("--dry-run", "Show output without modifying files")
  .action((file, options) => {
    const filePath = path.resolve(file);
    if (!fs.existsSync(filePath)) {
      console.error(`Error: File not found - ${filePath}`);
      process.exit(1);
    }

    const sourceCode = fs.readFileSync(filePath, "utf8");

    // Determine if the file is TypeScript or JavaScript
    const isTypeScript = filePath.endsWith(".ts");

    // Parse the file using Babel's parser for TypeScript if needed
    const ast = isTypeScript
      ? recast.parse(sourceCode, {
          parser: {
            parse: (code) =>
              babelParser.parse(code, {
                sourceType: "module",
                plugins: ["typescript"],
              }),
          },
        })
      : recast.parse(sourceCode);

    recast.types.visit(ast, {
      visitFunctionDeclaration(path) {
        const func = path.node;
        if (!hasJSDoc(func) || options.overwrite) {
          const jsDoc = generateJSDoc(func);
          func.comments = [recast.types.builders.commentBlock(jsDoc)];
        }
        return false;
      },
    });

    const output = recast.print(ast).code;
    if (options.dryRun) {
      console.log(output);
    } else {
      fs.writeFileSync(filePath, output, "utf8");
      console.log(`✅ JSDoc comments added to ${filePath}`);
    }
  });

function hasJSDoc(node) {
  return (
    node.comments &&
    node.comments.some((comment) => comment.type === "CommentBlock")
  );
}

program.parse();
