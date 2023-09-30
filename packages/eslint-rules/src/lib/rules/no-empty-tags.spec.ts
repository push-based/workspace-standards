import { RuleTester } from 'eslint';
import rule from './no-empty-tags';  // update this path to point to your rule file

const ruleTester = new RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
});

ruleTester.run('no-empty-tags', rule, {
  valid: [
    {
      filename: 'valid-package.json',
      code: JSON.stringify({
        name: "my-lib",
        tags: ["scope:client", "type:app"]
      }, null, 2),
      options: [{ validTags: ["type:app"] }],
    },
  ],
  invalid: [
    {
      filename: 'invalid-package.json',
      code: JSON.stringify({
        name: "my-app"
      }, null, 2),
      errors: [{ messageId: 'no-empty-tags', type: 'Program' }],
      options: [{ validTags: ["type:app", "another:tag"] }],
      output: JSON.stringify({
        name: "my-app",
        tags: ["type:app"]
      }, null, 2)
    },
  ],
});
