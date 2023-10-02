# @push-based/repo-sync/eslint-plugin

> eslint rules to enforce standards in a poly or mono repository setup.

## Installation

If you haven't already, install `@typescript-eslint/parser`:

```bash
npm install --save-dev @typescript-eslint/parser
```

Install the package:

```bash
npm install --save-dev @push-based/repo-sync
```

To use the recommended ruleset, extend the configuration in your ESLint config (e.g. `.eslintrc.json`):

```json
{
  "extends": ["repo-sync/recommended"]
}
```

Alternatively, if you prefer a more manual approach, add the plugin to your ESLint config, configure parser and enable whatever rules you chose:

```json
{
  "parser": "@typescript-eslint/parser",
  "plugins": ["repo-sync"],
  "rules": {
    "nx/no-empty-tags": "error",
    "nx/no-invalid-type-tags": "error"
  }
}
```

## Configurations

This plugin has one pre-defined configurations:

- `@repo-sync/recommended` is recommended for most Nx repositories

## Rules

Documentation for individual rules may be found [here](???).
