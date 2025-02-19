# AutoJSDoc [![NPM](https://nodei.co/npm/autojsdoc.png?mini=true)](https://www.npmjs.com/package/autojsdoc)

AutoJSDoc is a CLI tool designed to automatically generate JSDoc comments for your JavaScript and TypeScript functions. It helps streamline the process of documenting code by adding function descriptions and types based on inferred parameter names and return types.

## Features

- Automatically generates JSDoc comments for JavaScript and TypeScript functions.
- Supports `--overwrite` option to replace existing comments.
- Supports `--dry-run` to preview changes without modifying files.
- Easily integrates into your existing workflow.

## Installation

You can install AutoJSDoc globally or as a project dependency.

### Global Installation

To install AutoJSDoc globally, run the following command:

```bash
npm install -g autojsdoc
```

### Project Installation

To install AutoJSDoc as a project dependency, run the following command:

```bash
npm install --save-dev autojsdoc
```

### Usage

After installation, you can run AutoJSDoc from the command line.

#### Generate JSDoc for a JavaScript File

```bash
autojsdoc <path-to-your-file.js>
```

#### Generate JSDoc for a TypeScript File

```bash
autojsdoc <path-to-your-file.ts>
```

#### Options

• -o, --overwrite: Overwrite existing JSDoc comments.
• --dry-run: Preview the output without modifying files.

#### Example

```bash
autojsdoc examples/example.js --overwrite
```

This will generate JSDoc comments for all functions in example.js, overwriting any existing comments.

### Development

To contribute or make changes to AutoJSDoc, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/your-username/AutoJSDoc.git
```

2. Install dependencies:

```bash
npm install
```

3. Run tests and make changes as needed.

### License

Distributed under the MIT License. See LICENSE for more information.
