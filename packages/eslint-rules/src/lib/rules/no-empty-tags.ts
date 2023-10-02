import { Rule } from "eslint";
import { tagsEmpty } from "../utils/tags";

export const MESSAGE_ID = "empty-tags" as const;

export default {
  meta: {
    type: "problem",
    docs: {
      description: "Ensure tags are filled in `package.json`",
      category: "Best Practices",
      recommended: true
    },
    fixable: "code",
    messages: {
      [MESSAGE_ID]:
        "A `project.json` file should have tags configured"
    },
    schema: [
      {
        type: "object",
        properties: {
          defaultTags: {
            type: "array",
            items: {
              type: "string"
            },
            uniqueItems: true,
          }
        },
        additionalProperties: false
      }
    ]
  },
  create: (context) => {
    const configuration = context.options[0] || {};

    return ({
      "Program:exit": (node) => {
        const fileName = context.getFilename();
        if (!fileName.endsWith("package.json")) {
          return;
        }

        const content = context.getSourceCode().getText(node);

        let packageJson;
        try {
          packageJson = JSON.parse(content);
        } catch {
          // @Notice: It is best practice to use context#report instead of throwing an error.
          // However, the json parser will throw before in case an invalid json is provided.
          // So you don't reach this line in reality
          context.report({
            node,
            message: "Unable to parse package.json."
          });
          return;
        }

        if (tagsEmpty(packageJson)) {
          context.report({
            node,
            messageId: MESSAGE_ID,
            fix: (fixer) => {
              const _content = JSON.parse(content);
              _content.tags = configuration.defaultTags || ['untagged'];
              return fixer.replaceText(node, JSON.stringify(_content, null, 2));
            }
          });
          return;
        }
      }
    });
  }
} satisfies Rule.RuleModule;
