import { RuleTester } from "eslint";
import rule, { MESSAGE_ID } from "./no-empty-tags";

const ruleTester = new RuleTester({
  parser: require.resolve("@typescript-eslint/parser"),
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module"
  }
});

ruleTester.run(MESSAGE_ID, rule, {
  valid: [
    // configured tags
    {
      filename: "package.json",
      code: JSON.stringify({
        name: "my-lib",
        tags: ["scope:client", "type:app"]
      }, null, 2)
    },
    // other file name than `package.json`
    {
      filename: "random.json",
      code: JSON.stringify({}, null, 2)
    }
  ],
  invalid: [
    // undefined
    {
      filename: "package.json",
      code: JSON.stringify({
        tags: []
      }, null, 2),
      errors: [{ messageId: "nx/no-empty-tags", type: "Program" }],
      output: JSON.stringify({
        tags: []
      }, null, 2)
    },
    // empty
    {
      filename: "package.json",
      code: JSON.stringify({
        tags: []
      }, null, 2),
      errors: [{ messageId: "nx/no-empty-tags", type: "Program" }],
      output: JSON.stringify({
        tags: []
      }, null, 2)
    },
    // defaults
    {
      filename: "package.json",
      code: JSON.stringify({
        name: "my-app"
      }, null, 2),
      errors: [{ messageId: "nx/no-empty-tags", type: "Program" }],
      options: [{ defaultTags: ["type:app", "another:tag"] }],
      output: JSON.stringify({
        name: "my-app",
        "tags": [
          "type:app",
          "another:tag"
        ]
      }, null, 2)
    },
  ]
});
