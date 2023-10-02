import { RuleTester } from "eslint";
import rule, { EMPTY_MESSAGE_ID, INVALID_MESSAGE_ID } from "./no-invalid-type-tags";

const ruleTester = new RuleTester({
  parser: require.resolve("@typescript-eslint/parser"),
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module"
  }
});

const otherTypes = ["scope:client"];
const validTypes = ["app", "lib", "e2e"];
const wrongTypes = ["type:wrong-type-1", "type:wrong-type-2"];

ruleTester.run(EMPTY_MESSAGE_ID, rule, {
  valid: [
    {
      filename: "package.json",
      code: JSON.stringify({
        name: "my-lib",
        tags: [...otherTypes, ...validTypes]
      }, null, 2),
      options: [{ validTypes }],
    },
    {
      filename: "random.json",
      code: JSON.stringify({
        name: "my-app"
      }, null, 2),
      options: [{ validTypes }]
    }
  ],
  invalid: [
    // no tags
    {
      filename: "package.json",
      code: JSON.stringify({}, null, 2),
      errors: [{ messageId: EMPTY_MESSAGE_ID, type: "Program" }],
      options: [{ validTypes }],
      output: JSON.stringify({}, null, 2)
    },
    // empty tags
    {
      filename: "package.json",
      code: JSON.stringify({
        tags: []
      }, null, 2),
      errors: [{ messageId: EMPTY_MESSAGE_ID, type: "Program" }],
      options: [{ validTypes }],
      output: JSON.stringify({
        tags: []
      }, null, 2)
    },
    // invalid type
    {
      filename: "package.json",
      code: JSON.stringify({
        tags: [...otherTypes, ...wrongTypes, ...validTypes]
      }, null, 2),
      errors: [{ message: `${INVALID_MESSAGE_ID}: ${wrongTypes.join(", ")}`, type: 'Program' }],
      options: [{ validTypes }],
      output: JSON.stringify({
        tags: [...otherTypes, ...wrongTypes, ...validTypes]
      }, null, 2)
    }
  ],
});
